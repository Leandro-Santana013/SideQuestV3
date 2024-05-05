import React from "react";
import "./servicosAtivosCliente.css"
import { SidebarCliente, Header } from "../../components";
import sucessoIcon from "../../assets/sucesso1.png";
import iconeperfil from "../../assets/icone-perfil.png";
import alertaIcon from "../../assets/alerta.png";

const ServicosAtivosCliente = () => {
    return (
    <>
        <Header />
        <SidebarCliente />
        <div className="content-midia">
            <div className="sessao-cards">
                <h1>Serviços Ativos</h1>
                <div className="card-servicoProfissa">
                    <div className="icon-sucesso">
                        <img src={sucessoIcon} alt="icone de sucesso" />
                    </div>
                    <div className="desc-servico-usuario">
                        <h2>Pintura de Parede 4m²</h2>
                        <p>A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura. Ela é
                            atualmente de um tom neutro, mas quero transformá-la em um ponto de destaque na sala...
                            <strong>Ver mais detalhes</strong>
                        </p>
                        <div className="info-usuario">
                            <p>Início: 02/10/2023 Fim: 27/10/2023</p>
                            <div className="avaliacao">
                                <img src={iconeperfil} alt="icone perfil" id="perfil" />
                                <p>João Silva</p>
                                <i className="fa-regular fa-star"></i>
                                <p>4.9</p>
                            </div>
                        </div>
                        <div className="chat-cancelar">
                            <button id="finalizar">Finalizar</button>
                            <button id="chat">Chat</button>
                            <button id="cancelar">Cancelar</button>
                        </div>
                    </div>
                    <div className="btn-distancia">
                        <button>R$450</button>
                    </div>
                </div>

                <div className="card-servicoProfissa">
                    <div className="icon-sucesso">
                        <img src={sucessoIcon} alt="perigo" />
                    </div>
                    <div className="desc-servico-usuario">
                        <h2>Troca de fiação</h2>
                        <p>A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura. Ela é
                            atualmente de um tom neutro, mas quero transformá-la em um ponto de destaque na sala...
                            <strong>Ver mais detalhes</strong>
                        </p>
                        <div className="info-usuario">
                            <p>Início: 02/10/2023  Fim: 27/10/2023</p>
                            <div className="avaliacao">
                                <img src={iconeperfil} alt="icone perfil" id="perfil" />
                                <p>João Silva</p>
                                <i className="fa-regular fa-star"></i>
                                <p>4.9</p>
                            </div>
                        </div>
                        <div className="chat-cancelar">
                            <button id="finalizar">Finalizar</button>
                            <button id="chat">Chat</button>
                            <button id="cancelar">Cancelar</button>
                        </div>
                    </div>
                    <div className="btn-distancia">
                        <button>R$450</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default ServicosAtivosCliente;