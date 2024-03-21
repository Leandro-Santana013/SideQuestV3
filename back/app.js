// app.js
const app = require('./config/express');
const {connectionDataBase} = require("./database/db.js")
const authController = require ('./routes/auth');




app.use('/auth', authController);  // Em seguida, use o roteador de pages.js para o caminho raiz


(async () => {
    await connectionDataBase.sync()
    
    connectionDataBase.authenticate().then(() => {
      console.log("Conexão bem scedida")
  }).catch(erroConn => {
      console.error("Incapaz de fazer conexão", erroConn)
  })
   

app.listen(5002, () => {
  console.log(`Server running on port 5000`);
});
})();
