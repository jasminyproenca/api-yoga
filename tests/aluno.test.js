const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const AlunoService = require('../src/services/alunoService');
const alunoFixture = require('./fixtures/aluno.fixture');

describe('Aluno - POST /api/aluno', () => {
  // Limpar dados antes de cada teste
  beforeEach(() => {
    AlunoService.limpar();
  });

  // ===== TESTES DE SUCESSO =====
  describe('Sucesso', () => {
    it('Deve cadastrar um novo aluno com dados válidos', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoValido)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('sucesso', true);
          expect(res.body).to.have.property('mensagem');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('nome', alunoFixture.alunoValido.nome);
          expect(res.body.data).to.have.property('cpf', alunoFixture.alunoValido.cpf);
          expect(res.body.data).to.have.property('email', alunoFixture.alunoValido.email);
          expect(res.body.data).to.have.property('telefone', alunoFixture.alunoValido.telefone);
          expect(res.body.data).to.have.property('dataCriacao');

          done();
        });
    });

    it('Deve cadastrar múltiplos alunos com dados válidos', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoValido)
        .expect(201)
        .end((err, res1) => {
          if (err) return done(err);

          expect(res1.body.sucesso).to.equal(true);

          request(app)
            .post('/api/aluno')
            .send(alunoFixture.alunoValido2)
            .expect(201)
            .end((err, res2) => {
              if (err) return done(err);

              expect(res2.body.sucesso).to.equal(true);
              expect(res1.body.data.id).to.not.equal(res2.body.data.id);

              done();
            });
        });
    });
  });

  // ===== TESTES DE ERRO - CAMPOS OBRIGATÓRIOS =====
  describe('Erro - Campos obrigatórios', () => {
    it('Deve retornar erro 400 quando o corpo da requisição está vazio', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoVazio)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro');
          expect(res.body).to.have.property('mensagem');
          expect(res.body.erro).to.equal('Corpo da requisição vazio');

          done();
        });
    });

    it('Deve retornar erro 400 quando falta o campo nome', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoSemNome)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('obrigatórios');

          done();
        });
    });

    it('Deve retornar erro 400 quando falta o campo CPF', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoSemCPF)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('obrigatórios');

          done();
        });
    });

    it('Deve retornar erro 400 quando falta o campo email', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoSemEmail)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('obrigatórios');

          done();
        });
    });

    it('Deve retornar erro 400 quando falta o campo telefone', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoSemTelefone)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('obrigatórios');

          done();
        });
    });
  });

  // ===== TESTES DE ERRO - VALIDAÇÃO DE TIPOS =====
  describe('Erro - Validação de tipos', () => {
    it('Deve retornar erro 400 quando CPF não é numérico', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoComCPFInvalido)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('CPF');

          done();
        });
    });

    it('Deve retornar erro 400 quando telefone não é numérico', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoComTelefoneInvalido)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('Telefone');

          done();
        });
    });
  });

  // ===== TESTES DE ERRO - VALIDAÇÃO DE EMAIL =====
  describe('Erro - Validação de email', () => {
    it('Deve retornar erro 400 quando email é inválido', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoComEmailInvalido)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body).to.have.property('erro', 'Dados inválidos');
          expect(res.body.mensagem).to.include('Email inválido');

          done();
        });
    });
  });

  // ===== TESTES DE ERRO - DUPLICAÇÃO DE DADOS =====
  describe('Erro - Duplicação de dados', () => {
    it('Deve retornar erro 409 quando CPF já está cadastrado', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoValido)
        .expect(201)
        .end((err, res1) => {
          if (err) return done(err);

          // Tentar cadastrar com o mesmo CPF
          request(app)
            .post('/api/aluno')
            .send({
              ...alunoFixture.alunoValido,
              email: 'email-diferente@example.com'
            })
            .expect(409)
            .end((err, res2) => {
              if (err) return done(err);

              expect(res2.body).to.have.property('erro', 'Conflito');
              expect(res2.body.mensagem).to.include('CPF já cadastrado');

              done();
            });
        });
    });

    it('Deve retornar erro 409 quando email já está cadastrado', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoValido)
        .expect(201)
        .end((err, res1) => {
          if (err) return done(err);

          // Tentar cadastrar com o mesmo email
          request(app)
            .post('/api/aluno')
            .send({
              ...alunoFixture.alunoValido,
              cpf: 99999999999
            })
            .expect(409)
            .end((err, res2) => {
              if (err) return done(err);

              expect(res2.body).to.have.property('erro', 'Conflito');
              expect(res2.body.mensagem).to.include('Email já cadastrado');

              done();
            });
        });
    });
  });

  // ===== TESTES DE INTEGRAÇÃO =====
  describe('Integração', () => {
    it('Deve persistir os dados em memória após cadastro', (done) => {
      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoValido)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          // Verificar se está em memória
          const alunosEmMemoria = AlunoService.getAlunos();
          expect(alunosEmMemoria).to.have.length(1);
          expect(alunosEmMemoria[0].email).to.equal(alunoFixture.alunoValido.email);

          done();
        });
    });

    it('Deve limpar dados de memória entre testes', (done) => {
      AlunoService.limpar();
      
      const alunosAntes = AlunoService.getAlunos();
      expect(alunosAntes).to.have.length(0);

      request(app)
        .post('/api/aluno')
        .send(alunoFixture.alunoValido)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          const alunosCadastrados = AlunoService.getAlunos();
          expect(alunosCadastrados).to.have.length(1);

          done();
        });
    });
  });
});
