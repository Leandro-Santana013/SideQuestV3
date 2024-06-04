const { DataTypes } = require('sequelize');
const { _padraoTableDBExistence } = require('../../config/configTablesDB')
const { connectionDataBase } = require('../../database/db') // Importe a instância de conexão com o banco de dados

const ModelProfissionalProfileImg = connectionDataBase.define('tb_profissionalProfileImg', {
    id_profileImg: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'tb_profissional', // Nome da tabela de profissionais
            key: 'id_profissional'
        }
    },
    Img_profile: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    }
},
_padraoTableDBExistence('tb_profissionalProfileImg')
);

module.exports = { 
    ModelProfissionalProfileImg
 }
