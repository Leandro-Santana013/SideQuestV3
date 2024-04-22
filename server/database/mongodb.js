const mongoose = require('mongoose');

// Conexão com o MongoDB

const connectMongo = () => {
    mongoose.connect('mongodb://0.0.0.0:27017/db_chats_sidequest', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
    mongoDB.once('open', () => {
        console.log('Conexão bem sucedida com o MongoDB');
    });
}

module.exports = {
    connectMongo
}