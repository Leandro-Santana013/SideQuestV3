// config/express.js
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const randomSession = require('../tools/autoToken');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const secretSession = randomSession.jwtSecret;

app.use(session({
  secret: secretSession,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30000 }
}));

// Configuração do diretório público
const publicDirectory = path.join(__dirname, '../../front/');
app.use(express.static(publicDirectory));

// Configuração da engine de visualização
app.set('views', path.join(publicDirectory, 'views'));
app.set('view engine', 'hbs');

module.exports = app;
