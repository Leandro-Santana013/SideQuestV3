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
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 1, text: "Texto do slide 1", image: img1 },
  ],
  [
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 2, text: "Texto do slide 2", image: img2 },
  ],
  [
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 2, text: "Texto do slide 2", image: img2 },
    { id: 3, text: "Texto do slide 2", image: img2 },
  ],
  [
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 2, text: "Texto do slide 2", image: img2 },
    { id: 3, text: "Texto do slide 2", image: img2 },
    { id: 4, text: "Texto do slide 2", image: img2 },
  ],
  [
    { id: 1, text: "Texto do slide 1", image: img1 },
    { id: 2, text: "Texto do slide 2", image: img2 },
    { id: 3, text: "Texto do slide 2", image: img2 },
    { id: 4, text: "Texto do slide 2", image: img2 },
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
          <div>
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                className="carrossel-btn"
                id={`carrossel-btn${num}`}
                key={num}
                style={{
                  borderLeft:
                    activeCarrossel === num
                      ? "1.5px groove var(--verde)"
                      : "1px solid black",
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
                    ? "Eletrica"
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
            spaceBetween={50}
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
                        <div className="btn-buscar">
                          <a href={slide.htref}>Buscar</a>
                        </div>
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

/*
SwiperCore.use([Navigation]);

const slidesData1 = [
  { id: 1, text: 'Texto do slide 1', image: img1 },

];
const slidesData2 = [
  { id: 1, text: 'Texto do slide 1', image: img1 },
  { id: 2, text: 'Texto do slide 2', image: img2 },
  // Add more data for the second carousel if needed
];
const slidesData3 = [
  { id: 1, text: 'Texto do slide 1', image: img1 },
  { id: 2, text: 'Texto do slide 2', image: img2 },
  { id: 3, text: 'Texto do slide 3', image: img3 },
  // Add more data for the second carousel if needed
];

const slidesData4 = [
  { id: 1, text: 'Texto do slide 1', image: img1 },
  { id: 2, text: 'Texto do slide 2', image: img2 },
  { id: 3, text: 'Texto do slide 3', image: img3 },
  { id: 4, text: 'Texto do slide 3', image: img3 },
  // Add more data for the second carousel if needed
];

const slidesData5 = [
  { id: 1, text: 'Texto do slide 1', image: img1 },
  { id: 2, text: 'Texto do slide 2', image: img2 },
  { id: 3, text: 'Texto do slide 3', image: img3 },
  { id: 4, text: 'Texto do slide 3', image: img3 },
  { id: 5, text: 'Texto do slide 3', image: img3 },
  // Add more data for the second carousel if needed
];

{num === 1
              ? slidesData1.map((slide) => (
                <SwiperSlide key={slide.id} className='SwipperSlide'>
                  <div className="swiper mySwiper" id={`carrossel${num}`}>
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="card-carrossel">
                          <img src={slide.image} alt={slide.text} />
                          <p>{slide.text}</p>
                          <div className="btn-buscar">
                            <a href="">Buscar</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
              : num === 2
                ? slidesData2.map((slide) => (
                  <SwiperSlide key={slide.id} className='SwipperSlide'>
                    <div className="swiper mySwiper" id={`carrossel${num}`}>
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="card-carrossel">
                            <img src={slide.image} alt={slide.text} />
                            <p>{slide.text}</p>
                            <div className="btn-buscar">
                              <a href="">Buscar</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
                : num === 3
                  ? slidesData3.map((slide) => (
                    <SwiperSlide key={slide.id} className='SwipperSlide'>
                      <div className="swiper mySwiper" id={`carrossel${num}`}>
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="card-carrossel">
                              <img src={slide.image} alt={slide.text} />
                              <p>{slide.text}</p>
                              <div className="btn-buscar">
                                <a href="">Buscar</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))

                  : num === 4
                    ? slidesData4.map((slide) => (
                      <SwiperSlide key={slide.id} className='SwipperSlide'>
                        <div className="swiper mySwiper" id={`carrossel${num}`}>
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="card-carrossel">
                                <img src={slide.image} alt={slide.text} />
                                <p>{slide.text}</p>
                                <div className="btn-buscar">
                                  <a href="">Buscar</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))

                    : num === 5
                      ? slidesData5.map((slide) => (
                        <SwiperSlide key={slide.id} className='SwipperSlide'>
                          <div className="swiper mySwiper" id={`carrossel${num}`}>
                            <div className="swiper-wrapper">
                              <div className="swiper-slide">
                                <div className="card-carrossel">
                                  <img src={slide.image} alt={slide.text} />
                                  <p>{slide.text}</p>
                                  <div className="btn-buscar">
                                    <a href="">Buscar</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                      : null}
*/
