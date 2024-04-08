const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelImagensServico = connectionDataBase.define('tb_imagensServico', {

  id_imagensServico: {
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
  img_Servico: {
    type: DataTypes.BLOB,
    allowNull: true,
  },

},
_padraoTableDBExistence('tb_imagensServico')
)

module.exports = {
  ModelImagensServico
}