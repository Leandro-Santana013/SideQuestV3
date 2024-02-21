import React from 'react';
import Navbar from './navhome';
import ftbanner  from "../assets/ftbanner.png"
import Carrossel from "./carrosselSwiper"


const Home = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <div class="banner">
    <div class="left-banner">
      <div class="text-input">
        <h1>Encontre os melhores <strong>profissionais</strong> para <br/>sua <strong>residência</strong> aqui!
        </h1>
        <div class="content-input">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="busque por serviços" />
          <button class="btn-encontrar">encontrar</button>
        </div>
      </div>
      <img class="img-banner" src={ftbanner} alt="furadeira"/>
    </div>
  </div>
  <Carrossel/>
 
    </div>
  );
};

export default Home;
