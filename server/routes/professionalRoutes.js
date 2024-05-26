const express = require('express');
const router = express.Router();
const proControllers = require('../src/controllers/proConstroller')

router.post('/registerPro', proControllers.registerPro)
router.post('/loginPro', proControllers.loginPro)
router.post('/validaemailprofissional', proControllers.validaEmailPro)
router.post('/concluirCad', proControllers.concluirCad)
router.post('/servicoscard', proControllers.cardservico)
router.post('/servicoscardprivate', proControllers.cardservicosprivado)
router.get('/servico/:id_servico', proControllers.visuService)
router.get('/allUsers', proControllers.findAllUsers)
router.get('/find/:idCliente', proControllers.findUser)
router.post('/updateInfoPro', proControllers.updateInfoPro)
router.post('/servico/aceitar', proControllers.aceitarServico)


module.exports = router; 