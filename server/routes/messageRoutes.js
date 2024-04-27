const express = require('express');
const messageController = require('../src/controllers/messageController');
const router = express.Router();


router.post("/", messageController.createMessage)
router.get("/:chatId", messageController.getMessage)
module.exports = router; 