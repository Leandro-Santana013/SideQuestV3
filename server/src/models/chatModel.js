const mongoose = require("moongoose")
const { _padraoTableDBExistence } = require('../../config/configTablesDB')
const { connectionDataBase } = require('../../database/db')

const chatSchema = new mongoose.Schema(
    {
    members: Array,
    },
    {
        timestamps: true,
    }
)
   const chatModel = mongoose.model("Chat", chatSchema)

   module.exports = chatModel;