const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelCliente = connectionDataBase.define('tb_cliente', {
    id_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nm_cliente: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    cd_cpfCliente: {
        type: DataTypes.CHAR(11),
        allowNull: false
    },

    sg_sexoCliente: {
        type: DataTypes.CHAR(1)
    },

    qt_idadeCliente: {
        type: DataTypes.INTEGER.UNSIGNED
    },

    nmr_telefoneCliente: {
        type: DataTypes.CHAR(11),
        unique: true
    },

    cd_emailCliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    cd_senhaCliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    cd_tokenCliente: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    img_cliente: {
        type: DataTypes.TEXT('long'),
        allowNull:  true
    }
},
    _padraoTableDBExistence('tb_cliente')
)


module.exports = {
    ModelCliente
}