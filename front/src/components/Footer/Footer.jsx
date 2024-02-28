import React from "react";
import img_logo from "../../assets/logo_SideQuest.png";
import './footer.css'

export const Footer = () => {
  return (
    <footer>
      <img src={img_logo} alt="logo da SideQuest" />

      <div class="termos">
        <h6>Termos</h6>
        <a>Termos de uso</a>
        <a>Política de privacidade</a>
      </div>
      <div class="sobre">
        <h6>Sobre</h6>
        <a>Sobre nós</a>
        <a>Equipe SideQuest</a>
      </div>
    </footer>
  );
};
