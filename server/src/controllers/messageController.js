const mensagensModel = require("../models/messagens")


exports.createMessage = async (req, res) => {
    const {chatId, senderId, text} = req.body
    
    const message = new mensagensModel({
        chatId,
        senderId,
        text,
    })

    try {
        const response = await message.save()
        res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getMessage = async (req, res) => {
    const {chatId} = req.params 
    console.log(chatId)
    
    try {
        const messages = await mensagensModel.find({chatId})
        res.status(200).json(messages)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}