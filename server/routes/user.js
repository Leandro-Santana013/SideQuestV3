const express = require('express');
const userControllers = require('../src/controllers/userController');
const router = express.Router();

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.post('/validaemail', userControllers.validaEmail)
router.get('/selectCategoria', userControllers.selectCategoria)
router.post('/postarServico', userControllers.postarServico)
router.post('/postarServicoLoc', userControllers.postarServicoLoc)
router.post('/selectinfos', userControllers.selectinfos)
router.get('/find/:idProfissional', userControllers.findPro)
router.get('/profissionaisCard', userControllers.profissionalCard)
router.post('/updateInfoUser', userControllers.updateInfoUser) 
router.post('/concluirCad', userControllers.concluirCad)
router.get('/allProfissionais', userControllers.findAllProfissionais)
router.get('/perfil/profissionais/:id_profissional', userControllers.perfilpro)
router.post('/profissional/favoritado', userControllers.fav)
router.get('/getFavs/:id_cliente', userControllers.getFavoritos) 
router.get('/nservice/:id_cliente', userControllers.numService)
router.post('/serviceend', userControllers.Service)
router.post('/servicePend', userControllers.ServicePend)
router.post('/serviceHistorico', userControllers.Servicehistory)
router.post('/resetPass', userControllers.resetPass)
router.delete('/deleteAllintances/:id_cliente', userControllers.delete)
router.post('/terminarServico', userControllers.concluirServico)
module.exports = router; 
