// routes/pages.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render("index");

});

router.get('/cadastro', (req, res) => {
  res.render("cadastro");
  
});

router.get('/login', (req, res) => {
  req.session.destroy
    res.render("login");

});



router.get('/favoritos', (req, res) => {
  res.render("favoritos");
});

router.get('/homeCliente', (req, res) => {
  res.render("homeCliente");
  req.session.connected = {id: 1, username: 'sessions' };
});

router.get('/perfil', (req, res) => {
  if(req.session.connected){
  res.render("perfil");
  } else {
    res.redirect("login");
    req.session.destroy;
  }
});

router.get('/pagamentos', (req, res) => {
  if(req.session.connected){
    res.render("pagamentos");
    } else {
      res.redirect("login");
      req.session.destroy;
    }
});

router.get('/historico', (req, res) => {
  if(req.session.connected){
    res.render("historico");
    } else {
      res.redirect("login");
      req.session.destroy;
    }
});

router.get('/error404', (req, res) => {
  res.render("error404");
});

router.get('/homeProfissional', (req, res) => {
  if(req.session.connected){
    res.render("homeProfissional");
    } else {
      res.redirect("login");
      req.session.destroy;
    }
});

router.get('/confirmarEmail', (req, res) => {
  if(req.session.emailConrfim){
    res.render("confirmarEmail");
    } else {
      res.redirect("login");
      req.session.destroy;
    }
});

router.get('/visualizarServicoProfissional', (req, res) => {
  if(req.session.connected){
    res.render("vizualizarServicoProfissional");
    } else {
      res.redirect("login");
      req.session.destroy;
    }
});

router.get('/perfilProfissional', (req, res) => {
  res.render("perfilProfissional");
});

router.get('/servicosConcluidos', (req, res) => {
  res.render("servicosConcluidos");
});

router.get('/servicosAtivosCliente', (req, res) => {
  res.render("servicosAtivosCliente");
});

router.get('/servicosAtivosProfissional', (req, res) => {
  res.render("servicosAtivosProfissional");
});

router.get('/servicosPendentesCliente', (req, res) => {
  res.render("servicosPendentesCliente");
});

router.get('/visualizarServicoCliente', (req, res) => {
  res.render("visualizarServicoCliente");
});

module.exports = router;  