import React, { useEffect } from 'react';
import ani1 from '../assets/triangulo-animation2.png';
import ani2 from '../assets/substitutir.png';

const Animation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show1");
          // Comente ou remova a linha abaixo se você quiser que o elemento não seja escondido novamente
          // entry.target.classList.remove("hidden1");
        }
      });
    });

    const items = document.querySelectorAll('.hidden1');
    items.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []); // Executa o efeito apenas uma vez durante a montagem do componente

  return (
    <section className="animation2">
      <div className="poster">
        <div className="hidden1"><img className="inner-img-ani1" src={ani1} alt="" /></div>
        <div className="hidden1"><img className="inner-img-ani2" src={ani2} alt="" /></div>
      </div>
      <div className="conteudo-animation2">
        <div className="hidden1">
          <h2>O que é a SideQuest?</h2>
        </div>
        <div className="hidden1">
          <p>É uma plataforma inovadora onde é possível encontrar os melhores talentos locais para cuidar da sua
            casa com confiança e comodidade.</p>
        </div>
        <div className="hidden1"><a className="encontrar-pro" href="" id="hoverazul">Encontre Profissionais</a></div>
      </div>
    </section>
  );
};

export default Animation;
