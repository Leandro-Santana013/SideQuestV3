const { Sequelize, DataTypes } = require('sequelize');
const { _padraoTableDBExistence } = require('../../config/configTablesDB')
const { connectionDataBase } = require('../../database/db')

const ModelChat = connectionDataBase.define('tb_chat', {
    id_chat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_cliente',
            key: 'id_cliente'
        }
    },
    id_profissional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_profissional',
            key: 'id_profissional'
        }
    }
},
_padraoTableDBExistence('tb_avaliacao')
)

module.exports = {
    ModelChat
}