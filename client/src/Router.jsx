import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

import Landing from "./pages/Landing/landing";
import {Login} from "./pages/Login/Login";
import LoginProfissional from "./pages/LoginProfissional/LoginPro";
import ValidaEmail from "./pages/ValidaEmail/validaEmail";
import ValidaEmailProfissional from "./pages/validaEmailProfissional/validaEmailProfissional";
import HomeCliente from "./pages/HomeCliente/HomeCliente";
import PostarServico from "./pages/PostarServico/PostarServico";
import PagamentosCliente from "./pages/PagamentosCliente/PagamentosCliente";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historico from "./pages/Historico/Historico";
import HomeProfissionais from "./pages/HomeProfissional/HomeProfissional";
import ServicosPendentesCliente from "./pages/ServicosPendentesCliente/ServicosPendentesCliente";
import LandingProfissional from "./pages/LandingProfissional/LandingProfissional";
import Config from "./pages/Config/Config";

const Router = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={user ? <Navigate to="/homeCliente" /> : <Login />} />
          <Route exact path="/loginProfissional" element={<LoginProfissional />} />
          <Route exact path="/validaEmailProfissional" element={<ValidaEmailProfissional />} />
          <Route exact path="/validaemail" element={<ValidaEmail />} />
          <Route exact path="/homeCliente" element={true ? <HomeCliente /> : <Navigate to="/login" />} />
          <Route exact path="/homeCliente/postarSevico" element={<PostarServico />} />
          <Route exact path="/pagamentosCliente" element={<PagamentosCliente />} />
          <Route exact path="/favoritosCliente" element={<Favoritos />} />
          <Route exact path="/historicoCliente" element={<Historico />} />
          <Route exact path="/homeProfissionais" element={<HomeProfissionais />} />
          <Route exact path="/servicosPendentesCliente" element={<ServicosPendentesCliente />} />
          <Route exact path="/landingProfissional" element={<LandingProfissional />} />
          <Route exact path="/config" element={true ? <Config /> : <Navigate to="/login" />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Router;
