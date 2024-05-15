const { DataTypes } = require('sequelize');
const { _padraoTableDBExistence } = require('../../config/configTablesDB')
const { connectionDataBase } = require('../../database/db') // Importe a instância de conexão com o banco de dados

const ModelProfissionalCategoria = connectionDataBase.define('tb_profissional_categoria', {
    id_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'tb_profissional', // Nome da tabela de profissionais
            key: 'id_profissional'
        }
    },
    id_categoria: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'tb_categoria', // Nome da tabela de categorias
            key: 'id_categoria'
        }
    },
},
_padraoTableDBExistence('tb_profissional_categoria')
);

module.exports = { 
    ModelProfissionalCategoria
 }
