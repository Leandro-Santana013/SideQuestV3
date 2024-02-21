const crypto = require('crypto');

function generateRandomToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Gera a chave secreta ao importar o módulo
const jwtSecret = generateRandomToken();

module.exports = {
  jwtSecret,
};
