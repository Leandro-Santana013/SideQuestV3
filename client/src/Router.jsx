import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ChatContext, ChatContextProvider } from "./context/ChatContext";
import { UserContextProvider, UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import { ProfessionalContext, ProfessionalContextProvider } from "./context/ProfissionalContext";
import Landing from "./pages/Landing/landing";
import { Login } from "./pages/Login/Login";
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
import LandingProfissional from "./pages/LandingProfissional/LandingProfissional";
import Config from "./pages/Config/Config";
import { Chats } from "./pages/Chats/Chats";

const Router = () => {
  const { user } = useContext(UserContext);
  const { pro } = useContext(ProfessionalContext)
 
  return (
    <BrowserRouter>
      <ProfessionalContextProvider>
        < ChatContextProvider user={user} pro={pro}>

          <Routes>

            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={user ? <Navigate to="/homeCliente" /> : <Login />} />
            <Route exact path="/validaemail" element={<ValidaEmail />} />
            <Route exact path="/homeCliente" element={user ? <HomeCliente /> : <Navigate to="/login" />} />
            <Route exact path="/perfilCliente" element={<PerfilCliente />} />
            <Route exact path="/homeCliente/postarSevico" element={<PostarServico />} />
            <Route exact path="/pagamentosCliente" element={<PagamentosCliente />} />
            <Route exact path="/favoritosCliente" element={<Favoritos />} />
            <Route exact path="/historicoCliente" element={<Historico />} />
            <Route exact path="/servicosPendentesCliente" element={<ServicosPendentesCliente />} />
            <Route exact path="/landingProfissional" element={<LandingProfissional />} />
            <Route exact path="/config" element={user ? <Config /> : <Navigate to="/login" />} />
            <Route exact path="/chats" element={user ? <Chats /> : pro ? <Chats /> : <Navigate to="/login" />} />
            <Route exact path="/loginProfissional" element={pro ? <Navigate to="/homeProfissionais" /> : <LoginProfissional />} />
            <Route exact path="/landingProfissional" element={pro ? <LandingProfissional /> : <Navigate to="/loginProfissional" />} />
            <Route exact path="/validaEmailProfissional" element={pro ? <ValidaEmailProfissional /> : <Navigate to="/loginProfissional" />} />
            <Route exact path="/homeProfissionais" element={pro ? <HomeProfissionais /> : <Navigate to="/loginProfissional" />} />
          </Routes>

        </ChatContextProvider>
      </ProfessionalContextProvider>
    </BrowserRouter>
  );
}

export default Router;
