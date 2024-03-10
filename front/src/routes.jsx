import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import {Cadastro} from "./pages/Cadastro/Cadastro";
import ValidaEmail from "./pages/ValidaEmail/validaEmail";
import HomeCliente from "./pages/HomeCliente/HomeCliente";
import PerfilCliente from "./pages/PerfilCliente/PerfilCliente";
import PostarServico from "./pages/PostarServico/PostarServico";
import PagamentosCliente from "./pages/PagamentosCliente/PagamentosCliente";
import Favoritos from "./pages/Favoritos/Favoritos";
import Historico from "./pages/Historico/Historico";
import HomeProfissionais from "./pages/HomeProfissional/HomeProfissional";
import ServicosPendentesCliente from "./pages/ServicosPendentesCliente/ServicosPendentesCliente";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/validaemail",
    element: <ValidaEmail />,
  },
  {
    path: "/homecliente",
    element: <HomeCliente />,
  },
  {
    path: "/perfilCliente",
    element: <PerfilCliente />,
  },
  {
    path: "/postarServico",
    element: <PostarServico />,
  },
  {
    path: "/pagamentosCliente",
    element: <PagamentosCliente />,
  },
  {
    path: "/favoritosCliente",
    element: <Favoritos />,
  },
  {
    path: "/historicoCliente",
    element: <Historico />,
  },
  {
    path: "/homeProfissionais",
    element: <HomeProfissionais />,
  },
  {
    path: "/servicosPendentesCliente",
    element: <ServicosPendentesCliente />,
  },
]);

export default router;