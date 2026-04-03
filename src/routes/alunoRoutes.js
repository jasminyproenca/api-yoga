const express = require('express');
const AlunoController = require('../controllers/alunoController');

const router = express.Router();

// POST /aluno - Cadastro de aluno
router.post('/aluno', AlunoController.criarAluno);

module.exports = router;
