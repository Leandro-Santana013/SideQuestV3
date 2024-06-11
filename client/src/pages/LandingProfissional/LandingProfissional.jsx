
import "./landingProfissional.css";
import React from "react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import relogio from "../../assets/relogio.png";
import bannerProfissa from "../../assets/bannerProfissional.png";
import footerProfissional from "../../assets/footerProfissional.png";
import lupa from "../../assets/lupa.png";
import bandeirinha from "../../assets/bandeirinha.png";
import LogoSideQuest from "../../assets/logo_SideQuest.png";
import Eduardo from "../../assets/eduardo-mecanico.png";
import negocios from "../../assets/negociando.png";
import verificado from "../../assets/verificado.png";
import { Footer, HeaderLandingPro } from "../../components/index";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';


const LandingProfissional = () => {
    const [isActive, setIsActive] = useState(false); //isActive começa como falso, setIsActive muda o valor de isactive ao mudar os estado

    const AcaoAoCLicar = () => {
        setIsActive(!isActive); // Alterna o valor de isActive
    };


    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet" />

            <HeaderLandingPro colorLogin={"var(--azul)"} colorInsc={'white'} colorBtnInsc={"var(--azul)"} />

            <section className="bannerProfissa">
                <div className="btn-txtBanner">
                    <h1 className="title-banner">Junte-se ao nosso time de profissionais!</h1>
                    <button>Inscreva-se</button>
                </div>
                <img className="EduardoBanner" src={Eduardo} alt="Eduardo Mecânico" />
            </section>

            <section className="beneficios">
                <h1>Uma plataforma onde você pode <br /> se conectar com diversos <br /> clientes</h1>
                <div className="beneficios-img">
                    <img src={negocios} alt="negociando" />
                    <div className="txt-beneficios">
                        <h2>Benefícios</h2>
                        <div className="beneficios-cards">
                            <img src={lupa} alt="lupa" />
                            <p>Tenha visibilidade no mercado;</p>
                        </div>
                        <div className="beneficios-cards">
                            <img src={bandeirinha} alt="bandeirinha" />
                            <p>Encontre os seus clientes;</p>
                        </div>
                        <div className="beneficios-cards">
                            <img src={relogio} alt="relógio" />
                            <p>Flexibilidade no seu tempo.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="planos">
                <h2>Planos de pagamento</h2>
                <div className="cards-planos">
                    <div className="card-plano">
                        <h3>Plano Grátis</h3>
                        <p>Feito para você usar os benefícios básicos da plataforma.</p>
                        <hr />
                        <p id="preco">R$0<span>/Mês</span></p>
                        <button>Crie sua conta grátis</button>
                        <hr id="gray-hr" />
                        <div style={{display: 'flex', gap: '1vw', flexDirection: 'column'}}>
                        <div className="beneficios-plano">
                        
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Acesso à nossa rede de clientes</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Converse livremente com seus clientes</p>
                        </div>
                        <div className="beneficios-plano">
                            <img src={verificado} alt="verificado" />
                            <p className="pe">1 categoria para serviços</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">2 serviços por semana</p>
                        </div>
                        </div>
                    </div>
                    <div className="card-plano">
                        <h3>Plano Simples</h3>
                        <p>Feito para você que quer ter mais benefícios que os usuários comuns.</p>
                        <hr />
                        <p id="preco">R$109<span>/Mês</span></p>
                        <button>Teste grátis</button>
                        <hr id="gray-hr" />
                        <div style={{display: 'flex', gap: '1vw', flexDirection: 'column'}}>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Acesso à nossa rede de clientes</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Converse livremente com seus clientes</p>
                        </div>
                        <div className="beneficios-plano">
                            <img src={verificado} alt="verificado" />
                            <p className="pe">4 categorias para serviços</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Serviços ilimitados por semana</p>
                        </div>
                        </div>
                    </div>
                    <div className="card-plano">
                        <h3>Plano Irmãos a Obra</h3>
                        <p>Feito para você que quer ter todos os benefícios da plataforma.</p>
                        <hr />
                        <p id="preco">R$1200<span>/Ano</span></p>
                        <button>Melhor escolha</button>
                        <hr id="gray-hr" />
                        <div style={{display: 'flex', gap: '1vw', flexDirection: 'column'}}>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Acesso à nossa rede de clientes</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Converse livremente com seus clientes</p>
                        </div>
                        <div className="beneficios-plano">
                            <img src={verificado} alt="verificado" />
                            <p className="pe">10 categorias para serviços</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Serviços ilimitados por semana</p>
                        </div>
                        <div className="beneficios-plano">
                        <img src={verificado} alt="verificado" />
                            <p className="pe">Mais visibilidade na plataforma</p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};


export default LandingProfissional;
