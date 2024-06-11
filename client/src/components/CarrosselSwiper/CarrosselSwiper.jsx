import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import img1 from "../../assets/pintor.png";
import img2 from "../../assets/substitutir.png";
import banheiro from "../../assets/banheiro.jpg";
import calha from "../../assets/calha.jpg";
import cano from "../../assets/cano.jpg";
import cano2 from "../../assets/cano2.jpg";
import deck from "../../assets/deck.jpg";
import fechadura from "../../assets/fechadura.jpg";
import fiação from "../../assets/fiação.jpg";
import grama from "../../assets/grama.jpg";
import janela from "../../assets/janela.jpg";
import lampada from "../../assets/lampada.jpg";
import móveis from "../../assets/móveis.jpg";
import pintura1 from "../../assets/pintura 1.jpg";
import prateleira from "../../assets/prateleira.jpg";
import tomada from "../../assets/tomada.jpg";
import vazamento from "../../assets/vazamento.jpg";
import "./CarrosselSwiperStyle.css";

SwiperCore.use([Navigation]);

const allSlidesData = [
  [
    { id: 1, text: "Instalação de Lâmpadas", image: lampada },
    { id: 1, text: "Troca de Tomadas", image: tomada },
    { id: 1, text: "Reparo de Fiação Elétrica", image: fiação },
  ],
  [
    { id: 1, text: "Pintar Parede do Quarto", image: pintura1 },
    { id: 2, text: "Pintar Parede da Sala", image: pintura1 },
  ],
  [
    { id: 1, text: "Conserto de Encanamento", image: cano },
    { id: 2, text: "Desentupimento de Canos", image: cano2 },
    { id: 3, text: "Conserto de Vazamento", image: vazamento },
  ],
  [
    { id: 1, text: "Instalação de Prateleiras", image: prateleira },
    { id: 2, text: "Montagem de Móveis", image: móveis },
    { id: 3, text: "Reparação de Janelas", image: janela },
    { id: 4, text: "Reparação do Deck", image: deck },
  ],
  [
    { id: 1, text: "Desentupimento de Calhas", image: calha },
    { id: 2, text: "Trocar Fechaduras", image: fechadura },
    { id: 3, text: "Reforma de banheiro", image: banheiro },
    { id: 4, text: "Corte de grama", image: grama },
  ],
  [
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 2, text: "Texto do slide 2", image: img2 },
    { id: 3, text: "Texto do slide 1", image: img1 },
    { id: 4, text: "Texto do slide 2", image: img2 },
    { id: 5, text: "Texto do slide 1", image: img1 },
  ],
];

export const CarrosselSwiper = () => {
  const [activeCarrossel, setActiveCarrossel] = useState(1);

  function showCarrossel(carrosselNumber) {
    setActiveCarrossel(carrosselNumber);
  }

  return (
    <section className="swippers">
      <div className="header-siwpper">
        <h2>
          Principais <strong>serviços</strong>
        </h2>
        <div className="btns-swipper">
          <div className="swiper-button-prev btn-swipper"></div>
          <div className="swiper-button-next btn-swipper"></div>
        </div>
      </div>
      <div className="carrossel">
        <div className="left-carrossel">
          <div className="slaman">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                className="carrossel-btn"
                id={`carrossel-btn${num}`}
                key={num}
                style={{
                  borderLeft:
                    activeCarrossel === num
                      ? "4px solid var(--verde)"
                      : "4px solid #f4f4f4",
                }}
              >
                <p
                  id={`carrossel-palavra${num}`}
                  onClick={() => showCarrossel(num)}
                  style={{
                    color: activeCarrossel === num ? "var(--verde)" : "black",
                  }}
                >
                  {num === 1
                    ? "Elétrica"
                    : num === 2
                    ? "Pintura"
                    : num === 3
                    ? "Encanamento"
                    : num === 4
                    ? "Carpintaria"
                    : "Outros"}
    
                </p>
              </div>
            ))}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((num) => (
          <Swiper
            key={num}
            modules={[Navigation]}
            slidesPerView={3}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            style={{ display: activeCarrossel === num ? "block" : "none" }}
          >
            {allSlidesData[num - 1]?.map((slide) => (
              <SwiperSlide key={slide.id} className="SwipperSlide">
                <div className="swiper mySwiper" id={`carrossel${num}`}>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="card-carrossel">
                        <img src={slide.image} alt={slide.text} />
                        <p>{slide.text}</p>
                        <button className="btn-buscar">
                          <a href={slide.htref}>Buscar</a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ))}
      </div>
    </section>
  );
};
