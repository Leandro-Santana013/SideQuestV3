const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelInfoProfissional = connectionDataBase.define('tb_infoProfissional', {
    id_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references:{
            model:'tb_profissional',
            key:'id_profissional'
        }
    },
    ds_biografia: {
        type: DataTypes.TEXT,
        allowNull: true
    },


    ds_curriculo: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    ds_historicoProfissional: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    ds_formacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
},

    _padraoTableDBExistence('tb_infoProfissional')
)

module.exports = {
    ModelInfoProfissional
}