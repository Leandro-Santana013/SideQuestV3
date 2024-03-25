import "./landingProfissional.css";
import React from "react";
import { Form, Link } from "react-router-dom";
import relogio from "../../assets/relogio.png";
import bannerProfissa from "../../assets/bannerProfissional.png";
import footerProfissional from "../../assets/footerProfissional.png";
import lupa from "../../assets/lupa.png";
import bandeirinha from "../../assets/bandeirinha.png";
import LogoSideQuest from "../../assets/logo_SideQuest.png";
import Eduardo from "../../assets/eduardo-mecanico.png";
import negocios from "../../assets/negociando.png";
import chave from "../../assets/chave-inglesa.png";
import verificado from "../../assets/verificado.png";
import linha from "../../assets/linha.png";
import { Footer, HeaderLanding } from "../../components/index";

const LandingProfissional = () => {

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Lalezar&display=swap" rel="stylesheet" />

            <header className="menu-profissa">
                <nav className="nav-profissa">
                    <ul className="navprofissaUl">
                        <li className="navprofissaLi">
                            <img class="img-logo" src={LogoSideQuest} alt="Logo do SideQuest" />
                        </li>
                        <li className="navprofissaLi">
                            <a href="" className="navHomeA">
                                Encontrar serviços
                            </a>
                        </li>
                        <li className="navprofissaLi">
                            <a href="">Trabalhe conosco</a>
                        </li>
                        <div className="subContainerNavProfissa">
                            <li class="navprofissaLi btnNavProfissa">
                                <a href="/loginProfissional" class="tab-link link">
                                    <Link to={"/loginProfissional"}></Link>inscreva-se
                                </a>
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>

            <section className="bannerProfissa">
                <div className="btn-txtBanner">
                    <h1 className="title-banner">Se junte ao nosso time de profissionais!</h1>
                    <button>Inscreva-se</button>
                </div>
                <img className="EduardoBanner" src={Eduardo} alt="Eduardo Mecânico" />
            </section>

            <section className="beneficios">
                <h1>Uma plataforma onde você pode <br /> se conectar com diversos <br /> clientes</h1>
                <div className="beneficios-img">
                    <img src={negocios} alt="negociando" />
                    <div className="txt-beneficios">
                        <h2>benefícios</h2>
                        <div className="beneficios-cards">
                            <img src={lupa} alt="lupa" />
                            <p>Tenha visibilidade no mercado</p>
                        </div>
                        <div className="beneficios-cards">
                            <img src={bandeirinha} alt="bandeirinha" />
                            <p>Encontre potenciais clientes</p>
                        </div>
                        <div className="beneficios-cards">
                            <img src={relogio} alt="relógio" />
                            <p>Flexibilidade no seu tempo</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="planos">
                <h2>Planos de pagamento</h2>
                <div className="cards-planos">
                    <div className="card-plano">
                        <div className="card-superior">
                            <div className="gratis">
                                <img src={chave} alt="chave-inglesa" />
                                <p>Grátis</p>
                            </div>
                            <p id="vantagens-txt">Vantagens</p>
                            <div className="beneficio">
                                <img src={verificado} alt="verificado" />
                                <p>Tenha visibilidade no mercado</p>
                            </div>
                            <div className="beneficio">
                                <img src={verificado} alt="verificado" />
                                <p>Tenha visibilidade</p>
                            </div>
                            <div className="beneficio">
                                <img src={verificado} alt="verificado" />
                                <p>Tenha visibilidade</p>
                            </div>
                        </div>
                        
                        <div className="card-inferior">
                            <p><strong>R$0</strong> /Mês</p>
                            <Link to={"/cadastro"}><button>Crie sua conta grátis</button></Link>
                        </div>
                    </div>

                    <div className="card-plano">
                        <div className="card-superior">
                            <p>Plano Simples</p>
                        </div>
               
                        <div className="card-inferior">
                            <div className="valor-plano">
                                <p id="vlr">R$20</p><p id="mensal">/Mês</p>
                            </div>
                            <button>Teste Grátis</button>
                            <div className="list-beneficios">
                                <div className="beneficio">
                                    <img src={verificado} alt="verificado" />
                                    <p>Tenha visibilidade no mercado</p>
                                </div>
                                <div className="beneficio">
                                    <img src={verificado} alt="verificado" />
                                    <p>Tenha visibilidade</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-plano">
                        <div className="card-superior">
                            <p>Plano irmãos à obra</p>
                            <p id="vantagens-txt">Vantagens</p>
                            <div className="beneficio">
                                <img src={verificado} alt="verificado" />
                                <p>Tenha visibilidade no mercado</p>
                            </div>
                            <div className="beneficio">
                                <img src={verificado} alt="verificado" />
                                <p>Tenha visibilidade</p>
                            </div>
                            <div className="beneficio">
                                <img src={verificado} alt="verificado" />
                                <p>Tenha visibilidade</p>
                            </div>
                        </div>
                        
                        <div className="card-inferior">
                            <p><strong>R$1000</strong> /Ano</p>
                            <Link to={"/loginProfissional"}><button>Escolha</button></Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};


export default LandingProfissional;