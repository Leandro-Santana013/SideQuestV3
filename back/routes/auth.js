const express = require('express');
const userControllers = require('../controllers/userController');
const proControllers = require('../controllers/proConstroller')
const router = express.Router();

router.post('/register', userControllers.register);
router.post('/registerPro', proControllers.registerPro)
router.post('/login', userControllers.login);
router.get('/confirmarEmail', userControllers.validaEmail)

module.exports = router; 
