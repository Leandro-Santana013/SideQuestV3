import React from "react";
import Landing from "./pages/Landing/landing";
import Login from "./pages/Login/Login";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import ValidaEmail from "./pages/ValidaEmail/validaEmail";
import HomeCliente from "./pages/HomeCliente/HomeCliente";
import PerfilCliente from "./pages/PerfilCliente/PerfilCliente";
import PostarServico from "./pages/PostarServico/PostarServico";
import PagamentosCliente from "./pages/PagamentosCliente/PagamentosCliente";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historico from "./pages/Historico/Historico";
import HomeProfissionais from "./pages/HomeProfissional/HomeProfissional";
import ServicosPendentesCliente from "./pages/ServicosPendentesCliente/ServicosPendentesCliente";

import Login2 from "./pages/Login2/Login2";

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route exact path="/validaemail" element={<ValidaEmail />} />
        <Route exact path="/homeCliente" element={<HomeCliente />} />
        <Route exact path="/perfilCliente" element={<PerfilCliente />} />
        <Route exact path="/postarServico" element={<PostarServico />} />
        <Route exact path="/pagamentosCliente" element={<PagamentosCliente />} />
        <Route exact path="/favoritosCliente" element={<Favoritos />} />
        <Route exact path="/historicoCliente" element={<Historico />} />
        <Route exact path="/homeProfissionais" element={<HomeProfissionais />} />
        <Route exact path="/servicosPendentesCliente" element={<ServicosPendentesCliente />} />
        <Route exact path="/login2" element={<Login2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;