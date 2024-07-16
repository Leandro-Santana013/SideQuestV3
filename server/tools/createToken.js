const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { jwtSecret, hashemail } = require('./autoToken'); // Lembre-se de configurar o segredo do JWT

function generateEmailConfirmationToken(email) {
  return jwt.sign({ email }, jwtSecret, { expiresIn: '1h' }); 
}
function generateJwtWithShortHash() {
  const shortHash = hashemail;

  const payload = {
    hash: shortHash,
    exp: Math.floor(Date.now() / 1000) + (15 * 60) // Expira em 15 minutos (em segundos)
  };

  // Gerar o token JWT com um segredo (exemplo: 'my_secret_key')
  const token = jwt.sign(payload, 'my_secret_key');
  return token;
}

module.exports = {
  generateJwtWithShortHash
};
module.exports = {
  generateEmailConfirmationToken,
  generateJwtWithShortHash
};