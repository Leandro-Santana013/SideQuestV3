import React from "react";
import ReactDOM from "react-dom/client";
import Router from './Router'
import { UserContext, UserContextProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
    <Router/>
    </UserContextProvider>
  </React.StrictMode>
);