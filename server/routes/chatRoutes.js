const express = require('express');
const chatController = require('../src/controllers/chatController');
const router = express.Router();


router.post("/", chatController.createchat)
router.get("/:idCliente", chatController.findUserChats)
router.get("/find/:idCliente/:idProfissional", chatController.findChat)
module.exports = router; 