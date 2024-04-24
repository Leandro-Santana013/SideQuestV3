const mongoose = require("mongoose")

const mensagensSchema = new mongoose.Schema(
    {
    chatId: String,
    senderId: String,
    text: String
    },
    {
        timestamps: true,
    }
)
   const mensagensModel = mongoose.model("mensagens", mensagensSchema)

   module.exports = mensagensModel;