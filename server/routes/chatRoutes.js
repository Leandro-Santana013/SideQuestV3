const express = require('express');
const chatController = require('../src/controllers/chatController');
const router = express.Router();


router.post("/", chatController.createchat)
router.get("/:id_cliente", chatController.findUserChats)
router.get("/find/:idCliente/:idProfissional", chatController.findChat)
module.exports = router; 