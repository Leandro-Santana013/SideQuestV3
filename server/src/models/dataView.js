const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelDataView = connectionDataBase.define('tb_data_view', {
    id_data_view: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
    },
    id_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
            model:'tb_profissional',
            key:'id_profissional'
        }
    },
    ds_data: {
        type: DataTypes.DATE,
        allowNull: false
    },
},

    _padraoTableDBExistence('tb_data_view')
)

module.exports = {
    ModelDataView
}