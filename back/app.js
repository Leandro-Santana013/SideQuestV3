// app.js
const app = require('./config/express');
const db = require('./database/db');
const authController = require ('./routes/auth');
const cors = require('cors');
app.use(cors());



app.use('/auth', authController);  // Em seguida, use o roteador de pages.js para o caminho raiz


(async () => {
    await db.connect();
   

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
})();
