import React from 'react'
import { createBrowserRouter} from 'react-router-dom'
import Home from "./pages/home"
import Login from "./pages/Login"
import Cadastro from "./pages/cad"
import ValidaEmail from "./pages/validaEmail"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/validaemail",
    element: <ValidaEmail />
  },
])

export default router