const chatModel = require("../models/chatModel")

const createchat = async(req, res) =>{
    const {idCliente, idProfissional} = req.params 

    try{
        const chat = await chatModel.findOne({
            members: {$all: {idCliente, idProfissional}}
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