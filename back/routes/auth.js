const express = require('express');
const userControllers = require('../src/controllers/userController');
const proControllers = require('../src/controllers/proConstroller')
const router = express.Router();

const session = require('express-session');
const cookieParser = require('cookie-parser');

// Configure o uso desses middlewares
router.use(cookieParser());
router.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

router.post('/register', userControllers.register);
router.post('/registerPro', proControllers.registerPro)
router.post('/login', userControllers.login);
router.post('/validaemail', userControllers.validaEmail)
router.post('/postarServico', userControllers.postarServico)
router.post('/selectCategoria', userControllers.selectCategoria)

module.exports = router; 
