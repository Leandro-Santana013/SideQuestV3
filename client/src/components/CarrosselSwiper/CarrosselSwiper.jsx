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
import "./CarrosselSwiperStyle.css";

SwiperCore.use([Navigation]);

const allSlidesData = [
  [
    { id: 1, text: "Instalação de Lâmpadas", image: img1 },
    { id: 1, text: "Troca de Tomadas", image: img1 },
    { id: 1, text: "Reparo de Fiação Elétrica", image: img1 },
  ],
  [
    { id: 1, text: "Pintar Parede do Quarto", image: img1 },
    { id: 2, text: "Pintar Parede da Sala", image: img2 },
  ],
  [
    { id: 1, text: "Conserto de Encanamento", image: img1 },
    { id: 2, text: "Desentupimento de Canos", image: img2 },
    { id: 3, text: "Conserto de Vazamento", image: img2 },
  ],
  [
    { id: 1, text: "Instalação de Prateleiras", image: img1 },
    { id: 2, text: "Montagem de Móveis", image: img2 },
    { id: 3, text: "Reparação Janelas de Madeira", image: img2 },
    { id: 4, text: "Reparação do Deck", image: img2 },
  ],
  [
    { id: 1, text: "Desentupimento de Calhas", image: img1 },
    { id: 2, text: "Substituição de Fechaduras", image: img2 },
    { id: 3, text: "Reforma de banheiro", image: img2 },
    { id: 4, text: "Corte de grama", image: img2 },
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
