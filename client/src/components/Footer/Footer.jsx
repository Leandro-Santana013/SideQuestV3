import React from "react";
import img_logo from "../../assets/logo_SideQuest.png";
import "./footer.css"
export const Footer = () => {
  return (
    <footer>
      <div className="superior-footer">
        <div className="sidequest-bordao">
          <img src={img_logo} alt="SideQuest" />
          <p>Estamos aqui para simplificar sua vida, ao cuidar de sua residência!</p>
          </div>
          <div className="termos">
            <h4>Termos</h4>
            <p>Termos de uso</p>
            <p>Política de privacidade</p>
          </div>
          <div className="sobre">
            <h4>Sobre</h4>
            <p>Sobre nós</p>
            <p>Time SideQuest</p>
        </div>
      </div>
      <div className="inferior-footer">
        <hr />
        <p>Copyright© 2024 SideQuest. Todos os direitos reservados.</p>
      </div>
    </footer>
  );  
};
