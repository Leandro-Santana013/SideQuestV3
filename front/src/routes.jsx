import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import {Cadastro} from "./pages/Cadastro/Cadastro";
import ValidaEmail from "./pages/ValidaEmail/validaEmail";
import HomeCliente from "./pages/HomeCliente/HomeCliente";
import PerfilCliente from "./pages/PerfilCliente/PerfilCliente";
import PostarServico from "./pages/PostarServico/PostarServico";
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
    path: "/perfil",
    element: <PerfilCliente />,
  },
  {
    path: "/postarServico",
    element: <PostarServico />,
  },
]);

export default router;