import React,{useState} from "react";
import { SidebarCliente, Header, TextInputBusca} from "../../components";
import "./homeProfissional.css";
import "../../assets/icone-perfil.png";
import imgAproved from "../../assets/aproved.png";
import imgReload from "../../assets/reload.png";
import imgCalendario from "../../assets/calendario1.png";
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import { Link } from "react-router-dom";

import { RiFilter2Fill } from "react-icons/ri";

const HomeProfissionais = () => {
    const [text, setText] = useState("");
    const handleChange = (newValue) => {
      console.log("Novo valor:", newValue);
      setText(newValue);
    };
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
                        <TextInputBusca
                            onChange={handleChange}
                            placeholder={"Encontre profissionais"}
                            value={text}
                        />
                        <div className="filtros">
                            <p>Filtros</p>
                            <RiFilter2Fill className="iconFilter" />
                        </div>
                    </div>
                    <section className="area-servicos">
            <a href="/visualizarServico">
                <div className="card-servicoProfissa">
                    <div className="icon-sucesso">
                        <img src={imgSucesso} alt="Ícone de sucesso" />
                    </div>
                    <div className="desc-servico-usuario">
                        <h2>Pintura de Parede 4m²</h2>
                        <p>
                            A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura. Ela é atualmente de um tom neutro, mas quero transformá-la em um ponto de destaque na sala...
                            <strong>Ver mais detalhes</strong>
                        </p>
                        <div className="info-usuario">
                            <p>Publicação: 2 Horas atrás</p>
                            <div className="avaliacao">
                                <img src={ImgPerfil} alt="Ícone de perfil" id="perfil" />
                                <p>João Silva</p>
                                <i className="fa-regular fa-star"></i>
                                <p>4.9</p>
                            </div>
                        </div>
                    </div>
                    <div className="btn-distancia">
                        <button>R$450</button>
                        <div className="distancia">
                            <i className="ri-map-pin-2-line"></i>
                            <p>3km</p>
                        </div>
                    </div>
                </div>
            </a>
        </section>
                </div>
            </div>
        </>
    );
}

export default HomeProfissionais;
