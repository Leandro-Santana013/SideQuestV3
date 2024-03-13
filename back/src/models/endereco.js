const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelEndereco = connectionDataBase.define('tb_endereco', {
    cd_endereco: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    cd_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_cliente',
            key:'cd_cliente' 
        }
    },

    nm_logradouro: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    cd_cep: {
        type: DataTypes.CHAR(8),
        allowNull: false
    },
    nm_bairro:{
        type: DataTypes.STRING(100),
        allowNull: false
    },

    nr_casa:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    cd_cidade: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_cidade',
            key:'cd_cidade' 
        }
    },
},
    _padraoTableDBExistence('tb_endereco')
)

module.exports = {
    ModelEndereco
}