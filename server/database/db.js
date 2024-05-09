const { password, name, usu } = require("../config/connectInfo.js")
const { Sequelize, QueryTypes } = require("sequelize")

const connectionDataBase = new Sequelize(
    name, // Nome do banco de dados
    usu, // Nome de usuário
    password, // Senha
    {
        host: "localhost",
        dialect: "mysql",
        port: 3307,
        // Definindo o tempo limite de aquisição de conexão para 60 segundos (em milissegundos)
        pool: {
            acquire:  6000000
        }
    }
); 

module.exports = { connectionDataBase }

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Construa o caminho completo para o arquivo JSON
const filePath = path.join(__dirname, 'estados-cidades.json');
const flagFilePath = path.join(__dirname, 'script-rodado.txt');

// Verificação do arquivo de flag
if (fs.existsSync(flagFilePath)) {
  console.log('Script já foi executado anteriormente. Saindo');
  return;
}

fs.writeFileSync(flagFilePath, '');

// Leitura do arquivo JSON
const { estados } = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log(estados); // Adicione esta linha para verificar o conteúdo

// Conexão com o MySQL
const conexao = connectionDataBase;

// Iteração sobre cada estado e cidade no JSON e realização do insert
estados.forEach(estado => {
    estado.cidades.forEach(cidade => {
        // Substitua os valores das colunas pelos campos correspondentes no seu JSON
        const query = 'INSERT INTO tb_cidade (sg_estado, nm_cidade) VALUES (?, ?)';
        const valores = [estado.sigla, cidade];

        // Execução da query
        conexao.query(query, { replacements: valores, type: QueryTypes.INSERT })
            .then(result => {
                console.log(`{Cidade ${cidade} do estado ${estado.sigla} inserida com sucesso.}`);
            })
            .catch(err => {
                console.error(`Erro ao inserir cidade ${cidade} do estado ${estado.sigla}: ${err.message}`);
            });
    });
});