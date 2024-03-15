const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelCidade = connectionDataBase.define('tb_cidade', {
    id_cidade: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nm_cidade: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    sg_estado: {
        type: DataTypes.CHAR(2),
        allowNull: false
    },
},
    _padraoTableDBExistence('tb_cidade')
)

module.exports = {
    ModelCidade
}