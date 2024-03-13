const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelCategoria = connectionDataBase.define('tb_categoria', {
    cd_categoria: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ds_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },

},
    _padraoTableDBExistence('tb_categoria')
)

module.exports = {
    ModelCategoria
}