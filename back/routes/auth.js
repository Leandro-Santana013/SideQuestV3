    const express = require('express');
    const userControllers = require('../src/controllers/userController');
    const proControllers = require('../src/controllers/proConstroller')
    const router = express.Router();

    router.post('/register', userControllers.register);
    router.post('/registerPro', proControllers.registerPro)
    router.post('/login', userControllers.login);
    router.post('/validaemail', userControllers.validaEmail)
    router.post('/postarServico', userControllers.postarServico)
    router.post('/selectCategoria', userControllers.selectCategoria)

    module.exports = router; 
