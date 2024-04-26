// app.js
const app = require('./config/express.js');
const {connectionDataBase} = require("./database/db.js")
const userRoutes = require ('./routes/user.js');
const proRoutes = require ('./routes/professionalRoutes.js');
const chatRoutes = require ('./routes/chatRoutes');
const messageRoutes = require ('./routes/messageRoutes');
const {connectMongo} = require("./database/mongodb.js")




app.use('/user', userRoutes);  // Em seguida, use o roteador de pages.js para o caminho raiz
app.use('/chat', chatRoutes);
app.use('/professional', proRoutes);
app.use('/message', messageRoutes);

(async () => {
    await connectionDataBase.sync()
    connectMongo()
    connectionDataBase.authenticate().then(() => {
      console.log("Conexão bem sucedida")
  }).catch(erroConn => {
      console.error("Incapaz de fazer conexão", erroConn)
  })
   

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
})();
