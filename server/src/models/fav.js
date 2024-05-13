const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ClienteProfissionalFavorito =  connectionDataBase.define('tb_cliente_profissional_favorito', {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references:{
        model:'tb_profissional',
        key:'id_profissional'
    }
    },
    id_profissional: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'tb_profissional',
        key:'id_profissional' 
    }
    },
  }, _padraoTableDBExistence('tb_cliente_profissional_favorito')
)

module.exports = {
    ClienteProfissionalFavorito
}
  