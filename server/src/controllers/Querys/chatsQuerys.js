const { Model, Op, Sequelize } = require("sequelize");
const { raw } = require("mysql2");
const {
 ModelChat
} = require("../../models/index");
module.exports = {
createChat: async (req, res) => {
    const {id_cliente, id_profisssional} = req.params;
    return ModelChat.create({
        where: {
            id_cliente: id_cliente,
            id_profisssional: id_profisssional
        }
    })
},
findChat: async (req, res) => {
    const {id_cliente, id_profisssional} = req.params;
    return ModelChat.findOne({
        where: {
            id_cliente: id_cliente,
            id_profisssional: id_profisssional
        }
    })
}
}