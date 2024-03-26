import React from "react";
import Landing from "./pages/Landing/landing";
import {Login} from "./pages/Login/Login";
import LoginProfissional from "./pages/LoginProfissional/LoginPro";
import ValidaEmail from "./pages/ValidaEmail/validaEmail";
import ValidaEmailProfissional from "./pages/validaEmailProfissional/validaEmailProfissional";
import HomeCliente from "./pages/HomeCliente/HomeCliente";
import PerfilCliente from "./pages/PerfilCliente/PerfilCliente";
import PostarServico from "./pages/PostarServico/PostarServico";
import PagamentosCliente from "./pages/PagamentosCliente/PagamentosCliente";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historico from "./pages/Historico/Historico";
import HomeProfissionais from "./pages/HomeProfissional/HomeProfissional";
import ServicosPendentesCliente from "./pages/ServicosPendentesCliente/ServicosPendentesCliente";
import LandingProfissional from "./pages/LandingProfissional/LandingProfissional"

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/loginProfissional" element={<LoginProfissional />} />
        <Route exact path="/validaEmailProfissional" element={<ValidaEmailProfissional />} />
        <Route exact path="/validaemail" element={<ValidaEmail />} />
        <Route exact path="/homeCliente" element={<HomeCliente />} />
        <Route exact path="/perfilCliente" element={<PerfilCliente />} />
        <Route exact path="/postarServico" element={<PostarServico />} />
        <Route exact path="/pagamentosCliente" element={<PagamentosCliente />} />
        <Route exact path="/favoritosCliente" element={<Favoritos />} />
        <Route exact path="/historicoCliente" element={<Historico />} />
        <Route exact path="/homeProfissionais" element={<HomeProfissionais />} />
        <Route exact path="/servicosPendentesCliente" element={<ServicosPendentesCliente />} />
        <Route exact path="/landingProfissional" element={<LandingProfissional />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router;