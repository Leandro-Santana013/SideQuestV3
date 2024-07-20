const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelDataView = connectionDataBase.define('tb_data_view', {
    id_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references:{
            model:'tb_profissional',
            key:'id_profissional'
        }
    },
    views: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },

    ds_data: {
        type: DataTypes.DATE,
        allowNull: true
    },
},

    _padraoTableDBExistence('tb_data_view')
)

module.exports = {
    ModelDataView
}