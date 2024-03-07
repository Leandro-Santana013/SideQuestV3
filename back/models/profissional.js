const { DataTypes } = require('sequelize')
const { connectionDataBase } = require('../database/db')
const { _padraoTableDBExistence } = require('../config/configTablesDB')

const ModelProfissional = connectionDataBase.define('tb_profissional', {
    cd_profissional: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nm_trabalhador: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cd_cpftrabalhador: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        unique: true
    },
    sg_sexotrabalhador: {
        type: DataTypes.CHAR
    },
    qt_idadetrabalhador: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    nmr_telefonetrabalhador: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        unique: true
    },
    cd_emailtrabalhador: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cd_senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cd_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    }





})