const express = require('express');
const userControllers = require('../src/controllers/userController');
const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/validaemail', userControllers.validaEmail)
router.get('/selectCategoria', userControllers.selectCategoria)
router.post('/postarServico', userControllers.postarServico)
router.post('/selectinfos', userControllers.selectinfos)
router.post('/buscarattcls', userControllers.buscarattcls)
router.get('/profissionaisCard', userControllers.profissionalCard)
router.post('/updateInfoUser', userControllers.updateInfoUser)

module.exports = router; 
