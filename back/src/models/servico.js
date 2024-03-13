const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelServico = connectionDataBase.define('tb_servico', {
    cd_servico: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    dt_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dt_fim: {
        type: DataTypes.DATE,
    },
    ds_servico: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    vlr_servico: {
        type: DataTypes.DECIMAL(10, 2),
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
    cd_categoria: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_categoria',
            key:'cd_categoria' 
        }
    },
    cd_endereco: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_endereco',
            key:'cd_endereco' 
        }
    },
},
    _padraoTableDBExistence('tb_servico')
)

module.exports = {
    ModelServico
}