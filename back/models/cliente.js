const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../database/db')
const { _padraoTableDBExistence } = require('../config/configTablesDB')

const ModelCliente = connectionDataBase.define('tb_cliente', {
    cd_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nm_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cd_cpfCliente: {
        type: DataTypes.CHAR(11),
        allowNull: false
    },

    sg_sexoCliente: {
        type: DataTypes.CHAR
    },

    qt_idadeCliente: {
        type: DataTypes.INTEGER.UNSIGNED
    },

    nmr_telefonecliente: {
        type: DataTypes.CHAR
    },

    cd_emailCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cd_senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cd_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
},
    _padraoTableDBExistence('tb_cliente')
)


module.exports = {
    ModelCliente
}