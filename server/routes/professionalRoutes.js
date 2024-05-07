const express = require('express');
const router = express.Router();
const proControllers = require('../src/controllers/proConstroller')

router.post('/registerPro', proControllers.registerPro)
router.post('/loginPro', proControllers.loginPro)
router.post('/validaemailprofissional', proControllers.validaEmailPro)
router.get('/servicoscard', proControllers.cardservico)
router.get('/allUsers', proControllers.findAllUsers)
router.get('/find/:idCliente', proControllers.findUser)
module.exports = router; 