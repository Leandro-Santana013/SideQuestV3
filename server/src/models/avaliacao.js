const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelAvaliacao = connectionDataBase.define('tb_avaliacao', {
    id_avaliacao: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_terminoservico: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'tb_terminoServico',
          key: 'id_terminoServico'
        }
      },
      nmr_avaliacao: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ds_comentario: {
        type: DataTypes.TEXT,
        allowNull: true 
      },
      
},
_padraoTableDBExistence('tb_avaliacao')
)
module.exports = {
    ModelAvaliacao
}