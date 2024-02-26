
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: '../.env'});

async function connect() {
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "db_sidequest"
    });

    connection.connect((err) => {
        if (err) {
            console.error(`Erro ao conectar ao MySQL: ${err}`);
            throw err;
        }
        console.log('Conexão com o MySQL funcionando');
    });

    global.connection = connection;
    return connection;
}


module.exports = { connect };

