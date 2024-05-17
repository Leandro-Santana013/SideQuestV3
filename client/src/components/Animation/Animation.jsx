import React, { useEffect } from "react";
import tri1 from '../../assets/tri-animation.png';
import "./animation.css";

export const Animation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show1");
        }
      });
    });

    const items = document.querySelectorAll(".hidden1, .hidden2");
    items.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="animation2">
      <img className="hidden2" src={tri1} alt="Ilustração de design" />
      <div className="conteudo-animation2">
        <div className="hidden1">
          <h2>O que é a <span>SideQuest?</span></h2>
        </div>
        <div className="hidden1">
          <p>
            É uma plataforma inovadora onde é possível encontrar os melhores
            talentos locais para cuidar da sua casa com confiança e comodidade.
          </p>
        </div>
        <div className="hidden1">
          <a className="encontrar-pro" href="" id="hoverazul">
            Encontre Profissionais
          </a>
        </div>
      </div>
      <img className="hidden2" src={tri1} alt="Ilustração de design" style={{ rotate: '180deg' }} />
    </section>
  );
};
