const AlunoService = require('../services/alunoService');

class AlunoController {
  static criarAluno(req, res) {
    try {
      const { nome, cpf, email, telefone } = req.body;

      // Validar se o corpo da requisição está vazio
      if (!nome && !cpf && !email && !telefone) {
        return res.status(400).json({
          erro: 'Corpo da requisição vazio',
          mensagem: 'Os campos nome, cpf, email e telefone são obrigatórios'
        });
      }

      // Criar aluno através do serviço
      const aluno = AlunoService.criarAluno(nome, cpf, email, telefone);

      return res.status(201).json({
        sucesso: true,
        mensagem: 'Aluno cadastrado com sucesso',
        data: aluno
      });
    } catch (erro) {
      // Tratar erro de CPF ou email duplicado
      if (erro.message.includes('já cadastrado')) {
        return res.status(409).json({
          erro: 'Conflito',
          mensagem: erro.message
        });
      }

      // Tratar erros de validação
      if (erro.message.includes('inválido') || erro.message.includes('obrigatórios') || erro.message.includes('deve ser')) {
        return res.status(400).json({
          erro: 'Dados inválidos',
          mensagem: erro.message
        });
      }

      // Erro genérico
      return res.status(500).json({
        erro: 'Erro interno do servidor',
        mensagem: erro.message
      });
    }
  }
}

module.exports = AlunoController;
