const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userControllers = require('../src/controllers/userController');
const proControllers = require('../src/controllers/proConstroller')
const router = express.Router();
const randomSession = require('../tools/autoToken');


router.post('/register', userControllers.register);
router.post('/registerPro', proControllers.registerPro)

router.post('/login', userControllers.login);
router.post('/loginPro', proControllers.loginPro)

router.post('/validaemail', userControllers.validaEmail)
router.post('/validaemailprofissional', proControllers.validaEmailPro)

router.get('/selectCategoria', userControllers.selectCategoria)
router.post('/postarServico', userControllers.postarServico)

router.post('/selectinfos', userControllers.selectinfos)

router.post('/buscarattcls', userControllers.buscarattcls)


router.get('/profissionaisCard', userControllers.profissionalCard)
router.get('/servicoscard', proControllers.cardservico)
module.exports = router; 
