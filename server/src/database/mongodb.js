const mongoose = require("mongoose");

// Conexão com o MongoDB

const connectMongo = () => {
  mongoose.connect(
    "mongodb+srv://matheuslira13:123@cluster0.vhwuwf1.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const mongoDB = mongoose.connection;
  mongoDB.on(
    "error",
    console.error.bind(console, "Erro na conexão com o MongoDB:")
  );
  mongoDB.once("open", () => {
    console.log("Conexão bem sucedida com o MongoDB");
  });
};

module.exports = {
  connectMongo,
};
