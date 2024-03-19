const { password, name, usu } = require("../config/connectInfo.js")
const { Sequelize, QueryTypes } = require("sequelize")



const connectionDataBase = new Sequelize(
    `mysql://${usu}:${password}@localhost:3307/${name}`
)

module.exports = { connectionDataBase }

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Construa o caminho completo para o arquivo JSON
const filePath = path.join(__dirname, 'estados-cidades.json');

// ...

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
