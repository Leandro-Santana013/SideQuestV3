const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelConfirmacaoServico = connectionDataBase.define('tb_confirmacaoServico', {
    id_confirmacaoServico: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    id_postagemServico: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_postagemServico',
            key:'id_postagemServico'
        }
    },

    id_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_id_profissional',
            key:'id_id_profissional' 
        }
    },

    vlr_servico: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
},
_padraoTableDBExistence('tb_confirmacaoServico')
)

module.exports = {
    ModelConfirmacaoServico
}