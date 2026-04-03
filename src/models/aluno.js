const { v4: uuidv4 } = require('uuid');

class Aluno {
  constructor(nome, cpf, email, telefone) {
    this.id = uuidv4();
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
    this.dataCriacao = new Date();
  }
}

module.exports = Aluno;
