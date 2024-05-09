const app = require("./config/express.js");
const { connectionDataBase } = require("./database/db.js");
const userRoutes = require("./routes/user.js");
const proRoutes = require("./routes/professionalRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const { connectMongo } = require("./database/mongodb.js");

app.use("/user", userRoutes); // Em seguida, use o roteador de pages.js para o caminho raiz
app.use("/chat", chatRoutes);
app.use("/professional", proRoutes);
app.use("/message", messageRoutes);

async function startServer() {
  try {
    // Sincronizar os modelos do banco de dados principal
    await connectionDataBase.sync();
    console.log("Modelos sincronizados com o banco de dados principal.");

    // Conectar ao MongoDB
    connectMongo();
    console.log("Conexão com o MongoDB estabelecida com sucesso.");

    // Autenticar conexão com o banco de dados principal
    await connectionDataBase.authenticate();
    console.log("Conexão bem sucedida com o banco de dados principal.");

    // Iniciar o servidor
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1); // Encerra o processo com falha
  }
}

// Chama a função para iniciar o servidor
startServer();
