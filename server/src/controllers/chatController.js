const chatModel = require("../models/chatModel")

exports.createchat = async(req, res) =>{
    const {idCliente, idProfissional} = req.body

    try{
        const chat = await chatModel.findOne({
            members: {$all: [idCliente, idProfissional]}
        })
        if(chat) return res.status(200).json(chat)

        const newChat = new chatModel({
            members: [idCliente, idProfissional]
        })
        const response = await  newChat.save()

        res.status(200).json(response)
    }catch(error){
        console.log("erro" + error)
    }
}

exports.findUserChats = async(req, res) =>{
    const idCliente = req.params.idCliente

    try{
        const chats = await chatModel.find({
            members: {$in:[idCliente]}
        })
        res.status(200).json(chats)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

 exports.findChat = async(req, res) =>{
    const {idCliente, idProfissional} = req.params

    try{
        const chats = await chatModel.find({
            members: {$all: [idCliente, idProfissional]}
        })
        res.status(200).json(chats)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}