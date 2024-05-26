const { DataTypes } = require("sequelize");
const { connectionDataBase } = require("../../database/db");
const { _padraoTableDBExistence } = require("../../config/configTablesDB");

const ModelPostagemServico = connectionDataBase.define(
  "tb_postagemServico",
  {
    id_postagemServico: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    id_cliente: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "tb_cliente",
        key: "id_cliente",
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "tb_categoria",
        key: "id_categoria",
      },
    },
    id_endereco: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "tb_endereco",
        key: "id_endereco",
      },
    },
    ds_servico: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ds_titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    img_servico: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    tm_postagem: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pr_escolhido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  _padraoTableDBExistence("tb_postagemServico")
);

module.exports = {
  ModelPostagemServico,
};
