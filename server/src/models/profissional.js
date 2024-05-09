const { DataTypes } = require("sequelize");
const { connectionDataBase } = require("../database/db");
const { _padraoTableDBExistence } = require("../config/configTablesDB");

const ModelProfissional = connectionDataBase.define(
  "tb_profissional",
  {
    id_profissional: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nm_profissional: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cd_cpfProfissional: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: true,
    },
    sg_sexoProfissional: {
      type: DataTypes.CHAR,
    },
    qt_idadeProfissional: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    nmr_telefoneProfissional: {
      type: DataTypes.CHAR(11),
      allowNull: true,
      unique: true,
    },
    cd_emailProfissional: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    cd_senhaProfissional: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cd_tokenProfissional: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  _padraoTableDBExistence("tb_profissional")
);

module.exports = {
  ModelProfissional,
};
