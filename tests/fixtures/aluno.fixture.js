// Dados de teste para alunos

const alunoValido = {
  nome: 'João Silva',
  cpf: 12345678910,
  email: 'joao@example.com',
  telefone: 11987654321
};

const alunoValido2 = {
  nome: 'Maria Santos',
  cpf: 98765432110,
  email: 'maria@example.com',
  telefone: 11987654322
};

const alunoSemNome = {
  cpf: 12345678910,
  email: 'joao@example.com',
  telefone: 11987654321
};

const alunoSemCPF = {
  nome: 'João Silva',
  email: 'joao@example.com',
  telefone: 11987654321
};

const alunoSemEmail = {
  nome: 'João Silva',
  cpf: 12345678910,
  telefone: 11987654321
};

const alunoSemTelefone = {
  nome: 'João Silva',
  cpf: 12345678910,
  email: 'joao@example.com'
};

const alunoComCPFInvalido = {
  nome: 'João Silva',
  cpf: 'abc123',
  email: 'joao@example.com',
  telefone: 11987654321
};

const alunoComEmailInvalido = {
  nome: 'João Silva',
  cpf: 12345678910,
  email: 'email-invalido',
  telefone: 11987654321
};

const alunoComTelefoneInvalido = {
  nome: 'João Silva',
  cpf: 12345678910,
  email: 'joao@example.com',
  telefone: 'abc123'
};

const alunoVazio = {};

module.exports = {
  alunoValido,
  alunoValido2,
  alunoSemNome,
  alunoSemCPF,
  alunoSemEmail,
  alunoSemTelefone,
  alunoComCPFInvalido,
  alunoComEmailInvalido,
  alunoComTelefoneInvalido,
  alunoVazio
};
