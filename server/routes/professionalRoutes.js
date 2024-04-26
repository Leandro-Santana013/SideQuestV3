const express = require('express');
const router = express.Router();
const proControllers = require('../src/controllers/proConstroller')

router.post('/registerPro', proControllers.registerPro)
router.post('/loginPro', proControllers.loginPro)
router.post('/validaemailprofissional', proControllers.validaEmailPro)
router.get('/servicoscard', proControllers.cardservico)

module.exports = router; 