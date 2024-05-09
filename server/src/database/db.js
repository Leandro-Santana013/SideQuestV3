const { password, name, user } = require("../config/connectInfo.js");
const { Sequelize, QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const connectionDataBase = new Sequelize(name, user, password, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  pool: {
    acquire: 6000000,
  },
});

const filePath = path.join(__dirname, "estados-cidades.json");
const flagFilePath = path.join(__dirname, "script-rodado.txt");

module.exports = {
  connectionDataBase,
};

async function main() {
  try {
    if (fs.existsSync(flagFilePath)) {
      console.log("Script já foi executado anteriormente. Saindo");
      return;
    }

    fs.writeFileSync(flagFilePath, "");

    await connectionDataBase.authenticate();
    console.log("Conexão bem-sucedida!");

    const sqlFilePath = path.join(__dirname, "database.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");
    const sqlStatements = sqlContent
      .split(";")
      .filter((statement) => statement.trim() !== "");

    for (const sql of sqlStatements) {
      try {
        await connectionDataBase.query(sql, { type: Sequelize.QueryTypes.RAW });
        console.log("Instrução SQL executada com sucesso:", sql);
      } catch (error) {
        console.error("Erro ao executar a instrução SQL:", sql);
        console.error(error);
      }
    }

    const { estados } = JSON.parse(fs.readFileSync(filePath, "utf8"));

    for (const estado of estados) {
      for (const cidade of estado.cidades) {
        const query =
          "INSERT INTO tb_cidade (sg_estado, nm_cidade) VALUES (?, ?)";
        const valores = [estado.sigla, cidade];

        try {
          await connectionDataBase.query(query, {
            replacements: valores,
            type: QueryTypes.INSERT,
          });
          console.log(
            `Cidade ${cidade} do estado ${estado.sigla} inserida com sucesso.`
          );
        } catch (err) {
          throw `Erro ao inserir cidade ${cidade} do estado ${estado.sigla}: ${err.message}`;
        }
      }
    }

    console.log("Todas as operações foram concluídas com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

main();
