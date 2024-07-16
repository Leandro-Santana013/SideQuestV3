const crypto = require('crypto');
function generateRandomToken() {
  return crypto.randomBytes(32).toString('hex');
}

function generateShortHash() {
  const buffer = crypto.randomBytes(5); // Gera 5 bytes de dados aleatórios
  const hash = buffer.toString('hex').substring(0, 5); // Converte para hexadecimal e limita para 5 caracteres
  return hash;
} 
const jwtSecret = generateRandomToken();

// Gera o token para uso com hashemail (limitado a 5 caracteres)
const hashemail =generateShortHash();
module.exports = {
  jwtSecret,
  hashemail
};
