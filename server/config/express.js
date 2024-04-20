  // config/express.js
  const express = require('express');
  const path = require('path');
  const app = express();
  const ejs = require('ejs');
  const session = require('express-session');
  const bodyParser = require('body-parser');
  const randomSession = require('../tools/autoToken');
  const cors = require('cors');
  app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


  app.use(cors());
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


  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../../front/'));

  module.exports = app;

