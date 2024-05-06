const { DataTypes, BOOLEAN } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelEndereco = connectionDataBase.define('tb_endereco', {
    id_endereco: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    id_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_cliente',
            key:'id_cliente' 
        }
    },

    id_cidade: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_cidade',
            key:'id_cidade' 
        }
    },
    nm_logradouro: {
        type: DataTypes.STRING(100),
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

    nmr_casa:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    txt_complemento:{
        type: DataTypes.STRING(100),
    },
    end_principal:{
        type:DataTypes.BOOLEAN
    }
},
    _padraoTableDBExistence('tb_endereco')
)

module.exports = {
    ModelEndereco
}