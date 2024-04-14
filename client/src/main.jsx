import React from "react";
import ReactDOM from "react-dom/client";
import Router from './Router'
import { AuthContext, AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <Router/>
    </AuthContextProvider>
  </React.StrictMode>
);