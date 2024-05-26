//chatRoutes

const express = require('express');
const chatController = require('../src/controllers/chatController');
const router = express.Router();


router.post("/", chatController.createchat)
router.get("/user/:id_cliente", chatController.findUserChats)
router.get("/pro/:id_profissional", chatController.findUserChatsPro)
router.get("/find/:idCliente/:idProfissional", chatController.findChat)
module.exports = router; 