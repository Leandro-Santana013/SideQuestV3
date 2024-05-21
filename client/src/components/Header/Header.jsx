import React from "react";
import imgLogo from "../../assets/logo_SideQuest.png";

import "./header.css";
import Notificacao from "../Notificacao/Notificacao";
export const Header = () => {
  return (
    <div>
      <header className="containerHeader">
        <img class="img-logo" src={imgLogo} alt="Logo do SideQuest" />
        <div class="notificacao">
          <Notificacao/>
        </div>
      </header>
    </div>
  );
};
