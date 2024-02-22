// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import images
import imgPintor from "../assets/pintor.png";

export default function Carrossel(){
  
  return(
     <section className='swippers'>
     <div class="header-siwpper">
  <h2>Principais <strong>serviços</strong></h2>
  <div class="btns-swipper">

        <div class="swiper-button-prev btn-swipper"></div>
        <div class="swiper-button-next btn-swipper"></div>
      
  </div>
</div>
<div class="carrossel">
  <div class="left-carrossel">
    <div class="tipos-serviço">
      <div class="carrossel-btn" id="carrossel-btn1">
        <p id="carrossel-palavra1" onclick="showCarrossel(1)">Eletrica</p>
      </div>
      <div class="carrossel-btn" id="carrossel-btn2">
        <p id="carrossel-palavra2" onclick="showCarrossel(2)">Pintura</p>
      </div>
      <div class="carrossel-btn" id="carrossel-btn3">
        <p id="carrossel-palavra3" onclick="showCarrossel(3)">Encanamento</p>
      </div>
      <div class="carrossel-btn" id="carrossel-btn4">
        <p id="carrossel-palavra4" onclick="showCarrossel(4)">Carpintaria</p>
      </div>
      <div class="carrossel-btn" id="carrossel-btn5">
        <p id="carrossel-palavra5" onclick="showCarrossel(5)">Outros</p>
      </div>
    </div>
  </div>

    
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={3.5}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >

         <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel1">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel1">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel1">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide> <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel1">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide> <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel1">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y]}
      spaceBetween={50}
      slidesPerView={3.5}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >

         <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel2" style={{display: 'none'}}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel2" style={{display: 'none'}}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel2" style={{display: 'none'}}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide> <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel2" style={{display: 'none'}}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide> <SwiperSlide className='SwipperSlide'>
        <div className="swiper mySwiper" id="carrossel2" style={{display: 'none'}}>
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card-carrossel">
                <img src={imgPintor}alt="Pintor" />
                <p>Eletricista</p>
                <div className="btn-buscar">
                  <a href="">Buscar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
    </section>
)};

/*
const carrosselSwiper = () => {
    
// Criação do elemento script
var script = document.createElement('script');

// Define o atributo src com a URL da CDN
script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';

// Adiciona o elemento script ao final do corpo do documento
document.body.appendChild(script);



// Após o carregamento do script, você pode realizar a inicialização do Swiper

script.onload = function() {


    // Aqui você pode usar o Swiper, por exemplo:
    var swiper1 = new Swiper("#carrossel1", {
        slidesPerView: 3.5,
        spaceBetween: 30,
        rewind: true,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    var swiper2 = new Swiper("#carrossel2", {
        slidesPerView: 3.5,
        spaceBetween: 30,
        rewind: true,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    var swiper3 = new Swiper("#carrossel3", {
        slidesPerView: 3.5,
        spaceBetween: 30,
        rewind: true,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    var swiper4 = new Swiper("#carrossel4", {
        slidesPerView: 3.5,
        spaceBetween: 30,
        rewind: true,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    var swiper5 = new Swiper("#carrossel5", {
        slidesPerView: 3.5,
        spaceBetween: 30,
        rewind: true,
        freeMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
  
function showCarrossel(carrosselNumber) {
    console.log(`showCarrossel chamada com carrosselNumber: ${carrosselNumber}`);

    for (let i = 1; i <= 5; i++) {
        document.getElementById(`carrossel${i}`).style.display = 'none';
        document.getElementById(`carrossel-btn${i}`).style.borderLeft = 'solid 3px #757575';
        document.getElementById(`carrossel-palavra${i}`).style.color = 'black';
    }

    document.getElementById(`carrossel${carrosselNumber}`).style.display = 'block';
    document.getElementById(`carrossel-btn${carrosselNumber}`).style.borderLeft = 'solid 3px #3cbc8c';
    document.getElementById(`carrossel-palavra${carrosselNumber}`).style.color = 'var(--verde)';
}

}

  return (
    
    <section class="swippers">
    <div class="header-siwpper">
      <h2>Principais <strong>serviços</strong></h2>
      <div class="btns-swipper">
        <div class="swiper-button-prev btn-swipper"></div>
        <div class="swiper-button-next btn-swipper"></div>
      </div>
    </div>
    <div class="carrossel">
      <div class="left-carrossel">
        <div class="tipos-serviço">
          <div class="carrossel-btn" id="carrossel-btn1">
            <p id="carrossel-palavra1" onclick="showCarrossel(1)">Eletrica</p>
          </div>
          <div class="carrossel-btn" id="carrossel-btn2">
            <p id="carrossel-palavra2" onclick="showCarrossel(2)">Pintura</p>
          </div>
          <div class="carrossel-btn" id="carrossel-btn3">
            <p id="carrossel-palavra3" onclick="showCarrossel(3)">Encanamento</p>
          </div>
          <div class="carrossel-btn" id="carrossel-btn4">
            <p id="carrossel-palavra4" onclick="showCarrossel(4)">Carpintaria</p>
          </div>
          <div class="carrossel-btn" id="carrossel-btn5">
            <p id="carrossel-palavra5" onclick="showCarrossel(5)">Outros</p>
          </div>
        </div>
      </div>
      <div class="swiper mySwiper" id="carrossel1">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <div class="swiper mySwiper" id="carrossel2" style="display: none;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Eletricista</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <div class="swiper mySwiper" id="carrossel3" style="display: none;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Eletricista</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <div class="swiper mySwiper" id="carrossel4" style="display: none;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Eletricista</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <div class="swiper mySwiper" id="carrossel5" style="display: none;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Eletricista</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="card-carrossel">
              <img src={imgcarrossel1} alt="Pintor"/>
              <p>Pintura de parede</p>
              <div class="btn-buscar"><a href="">Buscar</a></div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

    </div>
  </section>
  )
}

export default carrosselSwiper
*/