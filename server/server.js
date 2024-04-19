const app = require('./config/express.js');
const {connectionDataBase} = require("./database/db.js")
const authController = require('./routes/auth.js');
const {connectMongo} = require('./database/mongodb.js')

app.use('/auth', authController);  // Em seguida, use o roteador de pages.js para o caminho raiz


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