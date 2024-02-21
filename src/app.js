// app.js
const app = require('./config/express');
const db = require('./database/db');
const view = require('./routes/pages');
const authController = require ('./routes/auth');


app.use('/auth', authController);  // Use o roteador de auth.js para '/register' primeiro
app.use('/', view);    // Em seguida, use o roteador de pages.js para o caminho raiz


(async () => {
    await db.connect();
   

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
})();
