import React, { useEffect, useState } from "react";
import img_Benefits_Review from "../../assets/Review.png";
import img_Benefits_Calendario from "../../assets/calendario.png";
import img_Benefits_high_five from "../../assets/high_five.png";

import "./benefits.css"


export const Benefits = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !visibleCards.includes(entry.target.id)) {
          setVisibleCards((prevVisibleCards) => [
            ...prevVisibleCards,
            entry.target.id,
          ]);
        }
      });
    });

    const cards = document.querySelectorAll(".hidden");
    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  return (
    <section className="beneficios">
      <h3> Benefícios </h3>
      <div className="animation1">
        <div
          id="card1"
          className={`hidden ${visibleCards.includes("card1") ? "show" : ""}`}
        >
          <div className="card">
            <img src={img_Benefits_Review} alt="Review" className="review" />
            <h2>Profissionais avaliados pela comunidade.</h2>
          </div>
        </div>

        <div
          id="card2"
          className={`hidden ${visibleCards.includes("card2") ? "show" : ""}`}
        >
          <img src={img_Benefits_Calendario} alt="Agenda" className="agenda" />
          <h2>
            Agende serviços <br />
            facilmente.
          </h2>
        </div>

        <div
          id="card3"
          className={`hidden ${visibleCards.includes("card3") ? "show" : ""}`}
        >
          <img
            src={img_Benefits_high_five}
            alt="High Five"
            className="high-five"
          />
          <h2>Sua casa em boas mãos!</h2>
        </div>
      </div>
    </section>
  );
};
