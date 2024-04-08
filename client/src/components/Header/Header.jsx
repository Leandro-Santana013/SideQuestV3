import React from "react";
import imgLogo from "../../assets/logo_SideQuest.png";

import "./header.css";
export const Header = () => {
  return (
    <div>
      <header className="containerHeader">
        <img class="img-logo" src={imgLogo} alt="Logo do SideQuest" />
        <div class="notificacao">
          <i class="fa-solid fa-bell"></i>
        </div>
      </header>
    </div>
  );
};
