import React from 'react';
import '../styles/index.css'
import Navbar from '../components/navhome';
import ftbanner from "../assets/ftbanner.png"
import Carrossel from "../components/carrosselSwiper"
import {Benefits} from "../components/benefits"
import {Animation} from "../components/animation2"
import Footer from "../components/footer"



const Home = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <div className="banner">
        <div className="left-banner">
          <div className="text-input">
            <h1 className='landingH1'>Encontre os melhores <strong>profissionais</strong> para <br />sua <strong>residência</strong> aqui!
            </h1>
            <div className="content-input">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="busque por serviços" />
              <button className="btn-encontrar">encontrar</button>
            </div>
          </div>
          <img className="img-banner" src={ftbanner} alt="furadeira" />
        </div>
      </div>
      <Carrossel />
      <Benefits />
      <Animation />
      <Footer/>
    </div>
  );
};

export default Home;
