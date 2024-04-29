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
                <div className="card-vizualisar">
                    <div className="card-superior">
                        <div className="titulo-servico">
                            <h2>Pintura de Parede 4M²</h2>
                            <h3>Pintura</h3>
                        </div>
                        <button>R1450</button>
                    </div>
                    <hr />
                    <div className="card-inferior">
                        <div className="proposta-servico">
                            <button>Aceitar</button>
                            <button>Fazer proposta</button>
                            <div className="perfil-avaliacao">
                                <img src={iconeperfil} alt="icon-perfil" />
                                <div className="nome-avaliacao">
                                    <p>Joao Silva</p>
                                    <div className="avaliacao">
                                        <p>4.9</p>
                                        <img src={avaliacao} alt="avaliacao" />
                                    </div>
                                </div>
                                <div className="distancia">
                                    <img src={endereco} alt="endereco" />
                                </div>
                            </div>
                        </div>
                        <div className="desc-servico">
                            <div className="data-servico">

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