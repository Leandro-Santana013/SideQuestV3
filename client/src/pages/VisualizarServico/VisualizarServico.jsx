import React from "react";
import "./VisualizarServico.css";
import { SidebarCliente, Header } from "../../components/index";
import bandeira from "../../assets/bandeira.png";
import iconeperfil from "../../assets/icone-perfil.png";
import endereco from "../../assets/endereco.png";
import btnplay from "../../assets/botao-play.png";
import avaliacao from "../../assets/estrelinha.png";

const VisualizarServico = () => {


    return (
        <>
            <Header />
            <SidebarCliente />
            <div className="content-midia">
                <div className="main-content">
                <div className="card-visualizar">
                    <div className="card-superior-servico">
                        <div className="titulo-servico">
                            <h2>Pintura de Parede 4M²</h2>
                            <h3>Pintura</h3>
                        </div>
                        <button>R1450</button>
                    </div>
                    <hr />
                    <div className="card-inferior-servico">
                        <div className="proposta-servico">
                            <button>Aceitar</button>
                            <button>Fazer proposta</button>
                            <div className="perfil-avaliacao">
                            <div className="avaliacao-icon-nome">
                            <img src={iconeperfil} alt="icon-perfil" />
                                <div className="nome-avaliacao">
                                    <p>Joao Silva</p>
                                    <div className="avaliacao">
                                        <p>4.9</p>
                                        <img src={avaliacao} alt="avaliacao" />
                                    </div>
                                </div>
                                </div>
                                <div className="distancia">
                                    <img src={endereco} alt="endereco" />
                                    <p>4km</p>
                                </div>
                            </div>
                        </div>
                        <div className="desc-servico">
                            <div className="descricao">
                            <h3>Descrição</h3>
                            <p>Preciso de uma pintura bem feita em uma parede de 4m². Quero um serviço de qualidade e sem fazer muita sujeira. O serviço deve ser concluido em no máximo 2 dias.</p>
                            </div>
                            <div className="data-servico">
                                <div className="inicio">
                                    <img src={btnplay} alt="botão início" />
                                    <p>Início</p>
                                </div>
                                <div className="fim">
                                    <img src={bandeira} alt="fim" />
                                    <p>Fim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default VisualizarServico;