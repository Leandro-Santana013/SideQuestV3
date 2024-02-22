import React from 'react';
import '../styles/index.css'
import Navbar from '../components/navhome';
import ftbanner from "../assets/ftbanner.png"
import Carrossel from "../components/carrosselSwiper"
import Ani1 from "../components/benefits"
import Ani2 from "../components/animation2"
import Footer from "../components/footer"



const Home = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <div class="banner">
        <div class="left-banner">
          <div class="text-input">
            <h1>Encontre os melhores <strong>profissionais</strong> para <br />sua <strong>residência</strong> aqui!
            </h1>
            <div class="content-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="busque por serviços" />
              <button class="btn-encontrar">encontrar</button>
            </div>
          </div>
          <img class="img-banner" src={ftbanner} alt="furadeira" />
        </div>
      </div>
      <Carrossel />
      <Ani1 />
      <Ani2 />
      <Footer/>
    </div>
  );
};

export default Home;
