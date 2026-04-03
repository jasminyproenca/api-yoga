const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    url: '/resources/swagger.json'
  }
}));

// Endpoint para renderizar o arquivo Swagger em JSON
app.get('/resources/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

// Rotas
app.use('/api', alunoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mensagem: 'API está funcionando' });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Cadastro de Alunos',
    versao: '1.0.0',
    documentacao: '/api-docs',
    endpoints: {
      cadastroAluno: 'POST /api/aluno'
    }
  });
});

module.exports = app;
