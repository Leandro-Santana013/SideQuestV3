import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { UserContextProvider } from "./context/UserContext";
import {
  ProfessionalContext,
  ProfessionalContextProvider,
} from "./context/ProfissionalContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ProfessionalContextProvider>
        <Router />
      </ProfessionalContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
