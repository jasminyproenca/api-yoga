# API de Cadastro de Alunos

API Rest para cadastro de alunos do programa de Yoga, desenvolvida com Node.js e Express.

## Objetivo

Fornecer uma API Rest simples e eficiente para cadastro de alunos, com armazenamento em memória e documentação via Swagger.

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web para Node.js
- **UUID**: Geração de IDs únicos
- **Swagger UI Express**: Interface de documentação da API
- **Mocha**: Framework de testes
- **Chai**: Biblioteca de assertions
- **Supertest**: Testes HTTP

## Estrutura do Projeto

```
api-yoga/
├── src/
│   ├── controllers/
│   │   └── alunoController.js      # Controller de alunos
│   ├── models/
│   │   └── aluno.js                 # Modelo de aluno
│   ├── services/
│   │   └── alunoService.js          # Serviço de alunos (lógica de negócio)
│   ├── routes/
│   │   └── alunoRoutes.js           # Rotas de alunos
│   ├── app.js                       # Configuração da aplicação Express
│   └── server.js                    # Ponto de entrada
├── tests/
│   ├── fixtures/
│   │   └── aluno.fixture.js         # Dados de teste
│   ├── aluno.test.js                # Testes de alunos
│   └── aula.test.js                 # Testes de aulas (placeholder)
├── resources/
│   └── swagger.json                 # Documentação OpenAPI
├── package.json                     # Dependências do projeto
└── README.md                        # Este arquivo
```

## Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos

1. Clone ou crie o projeto
2. Instale as dependências:

```bash
npm install
```

## Como Usar

### Iniciar o servidor

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor iniciará em `http://localhost:3000`

### Acessar a Documentação

- **Interface Swagger**: `http://localhost:3000/api-docs`
- **JSON da API**: `http://localhost:3000/resources/swagger.json`
- **Health Check**: `http://localhost:3000/health`

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (observa mudanças)
npm run test:watch
```

## Endpoints

### Cadastro de Aluno

**POST** `/api/aluno`

Cadastra um novo aluno no sistema.

#### Request Body

```json
{
  "nome": "string",
  "cpf": "number",
  "email": "string",
  "telefone": "number"
}
```

#### Exemplo de Request

```bash
curl -X POST http://localhost:3000/api/aluno \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": 12345678910,
    "email": "joao@example.com",
    "telefone": 11987654321
  }'
```

#### Response 201 (Sucesso)

```json
{
  "sucesso": true,
  "mensagem": "Aluno cadastrado com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "João Silva",
    "cpf": 12345678910,
    "email": "joao@example.com",
    "telefone": 11987654321,
    "dataCriacao": "2026-04-03T10:30:00.000Z"
  }
}
```

## Regras de Negócio

### Validações

- **Campos obrigatórios**: Nome, CPF, email e telefone são obrigatórios
- **CPF**: Deve ser numérico
- **Telefone**: Deve ser numérico
- **Email**: Deve estar em formato válido (padrão básico)
- **Unicidade de CPF**: Não é permitido cadastrar dois alunos com o mesmo CPF
- **Unicidade de Email**: Não é permitido cadastrar dois alunos com o mesmo email

### Códigos de Erro

| Status | Erro | Causa |
|--------|------|-------|
| 400 | Dados inválidos | Campos obrigatórios faltando ou com valores inválidos |
| 409 | Conflito | CPF ou email já cadastrado |
| 500 | Erro interno do servidor | Erro inesperado da aplicação |

## Armazenamento de Dados

Os dados são armazenados em memória e **não persistem entre reinicializações** do servidor. Para cada requisição de teste, a memória é limpa via `beforeEach` para garantir independência entre os testes.

## Arquitetura em Camadas

### Models
Definem a estrutura dos dados (classe `Aluno`).

### Services
Contêm a lógica de negócio e manipulação dos dados em memória.

### Controllers
Tratam as requisições HTTP e delegam a lógica para os services.

### Routes
Definem os endpoints da API e associam aos controllers.

## Testes

Os testes cobrem:

- ✅ Cadastro bem-sucedido de alunos
- ✅ Cadastro de múltiplos alunos
- ✅ Validação de campos obrigatórios
- ✅ Validação de tipos (CPF e telefone numéricos)
- ✅ Validação de email
- ✅ Prevenção de CPF duplicado
- ✅ Prevenção de email duplicado
- ✅ Persistência em memória
- ✅ Limpeza de memória entre testes

### Executar Testes com Detalhes

```bash
npm test -- --reporter spec
```

## Documentação Swagger

A documentação está em formato OpenAPI 3.0 e inclui:

- Descrição detalhada dos endpoints
- Schema de requisição e resposta
- Exemplos de payloads
- Códigos de erro
- Modelos de dados

Acesse em: `http://localhost:3000/api-docs`

## Possíveis Extensões Futuras

- Banco de dados persistente (MongoDB, PostgreSQL)
- Autenticação e autorização
- Endpoints de listagem, atualização e exclusão de alunos
- Validação mais robusta de CPF
- Paginação de resultados
- Rate limiting
- Logs estruturados
- Containerização (Docker)
- CI/CD (GitHub Actions, GitLab CI)

## Autor

API de Cadastro de Alunos - Programa de Yoga

Teste de commit feito por Claudia

## Licença

ISC
>>>>>>> 91ff646 (Iniciando a criação de uma API e Testes Automatizados)
