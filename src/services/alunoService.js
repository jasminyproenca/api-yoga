const Aluno = require('../models/aluno');

// Armazenamento em memória
let alunos = [];

class AlunoService {
  // Criar um novo aluno
  static criarAluno(nome, cpf, email, telefone) {
    // Validar campos obrigatórios
    if (!nome || !cpf || !email || !telefone) {
      throw new Error('Todos os campos são obrigatórios');
    }

    // Validar CPF - deve ser numérico
    if (isNaN(cpf)) {
      throw new Error('CPF deve ser um número');
    }

    // Validar telefone - deve ser numérico
    if (isNaN(telefone)) {
      throw new Error('Telefone deve ser um número');
    }

    // Validar email - padrão básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    // Verificar se CPF já existe
    const alunoExistente = alunos.find(a => a.cpf === Number(cpf));
    if (alunoExistente) {
      throw new Error('CPF já cadastrado');
    }

    // Verificar se email já existe
    const emailExistente = alunos.find(a => a.email === email);
    if (emailExistente) {
      throw new Error('Email já cadastrado');
    }

    // Criar novo aluno
    const novoAluno = new Aluno(nome, Number(cpf), email, Number(telefone));
    alunos.push(novoAluno);

    return novoAluno;
  }

  // Obter todos os alunos
  static obterTodos() {
    return alunos;
  }

  // Obter aluno por ID
  static obterPorId(id) {
    return alunos.find(a => a.id === id);
  }

  // Limpar todos os alunos (para testes)
  static limpar() {
    alunos = [];
  }

  // Obter alunos da memória (para testes)
  static getAlunos() {
    return alunos;
  }
}

module.exports = AlunoService;
