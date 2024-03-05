import React from "react";
import { SidebarCliente, Header } from "../../components";
import "./homeProfissional.css";
import "../../assets/icone-perfil.png";
import imgAproved from "../../assets/aproved.png";
import imgReload from "../../assets/reload.png";
import imgCalendario from "../../assets/calendario1.png";


function HomeProfissionais() {
    return (
        <>
        <Header />
        <SidebarCliente />
            <div className="content-midia">
                <div className="menu-profissionais">
                    <div className="menu-topo">
                        <div className="actions">
                            <div className="info-action">
                                <p>Adicionar serviço</p>
                                <div className="action">
                                    <p>Publique um serviço e receba orçamentos</p>
                                    <img src={imgAproved} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="actions">
                            <div className="info-action">
                                <p>Serviços Ativos</p>
                                <div className="action">
                                    <p>Você possui 3 serviços ativos</p>
                                    <img src={imgReload} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="actions">
                            <div className="info-action">
                                <p>Serviços Pendentes</p>
                                <div className="action">
                                    <p>Visualize os serviços pendentes</p>
                                    <img src={imgCalendario} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1>Encontre os melhores profissionais para o seu problema</h1>

                    <div className="input-filtros">
                        <div className="content-input">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="busque por serviços" />
                        </div>
                        <div className="filtros">
                            <p>Filtros</p>
                            <i className="fa-solid fa-sliders"></i>
                        </div>
                    </div>

                    <section className="area-servicos">
                        <a href="/visualizarServico">
                            <div className="card-servicoProfissa">
                                {/* Adicione mais conteúdo aqui */}
                            </div>
                        </a>
                    </section>
                </div>
            </div>
        </>
    );
}

export default HomeProfissionais;
