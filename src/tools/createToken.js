const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./autoToken'); // Lembre-se de configurar o segredo do JWT

function generateEmailConfirmationToken(email) {
  return jwt.sign({ email }, jwtSecret, { expiresIn: '1h' }); 
}

module.exports = {
  generateEmailConfirmationToken,
};