const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../../database/db')
const { _padraoTableDBExistence } = require('../../config/configTablesDB')

const ModelTerminoServico = connectionDataBase.define('tb_avaliacao',{
    id_terminoServico: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_confirmacaoServico: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        references:{
            model:'tb_confirmacaoServico',
            key:'id_confirmacaoServico'
        }
    },
    dt_terminoServico: {
        type: DataTypes.DATE,
        allowNull:false 
    }

},
_padraoTableDBExistence('tb_profissional')
)

module.exports = {
    ModelTerminoServico
}