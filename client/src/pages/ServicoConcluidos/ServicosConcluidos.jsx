import React from 'react';
import { SidebarCliente, Header} from "../../components";
import "./servicosConcluidos.css";
import sucessoIcon from "../../assets/sucesso1.png";
import iconeperfil from "../../assets/icone-perfil.png";
import alertaIcon from "../../assets/alerta.png";
function ServicosConcluidos() {
    return (
        <>
        <Header />
        <SidebarCliente />
        <div className="content-midia">
            <div className="sessao-cards">
                <h1>Serviços Concluídos</h1>
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
                            <p>Terminado: ontem</p>
                            <div className="avaliacao">
                                <img src={iconeperfil} alt="icone perfil" id="perfil" />
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

                <div className="card-servicoProfissa">
                    <div className="icon-sucesso">
                        <img src={sucessoIcon} alt="icone de sucesso" />
                    </div>
                    <div className="desc-servico-usuario">
                        <h2>Troca de fiação</h2>
                        <p>Estou enfrentando um desafio significativo em relação à fiação elétrica da minha casa. A
                            infraestrutura existente é antiga e, infelizmente, não está mais conseguindo atender à demanda
                            dos aparelhos modernos que utilizo diariamente. A situação se tornou tão crítica que estou
                            preocupado com a segurança da instalação elétrica como um todo.</p>
                        <div className="info-usuario">
                            <p>Terminado: a 12 dias atrás</p>
                            <div className="avaliacao">
                                <img src={iconeperfil} alt="icone perfil" id="perfil" />
                                <p>João Silva</p>
                                <i className="fa-regular fa-star"></i>
                                <p>4.9</p>
                            </div>
                        </div>
                    </div>
                    <div className="btn-distancia">
                        <button>R$1800</button>
                        <div className="distancia">
                            <i className="ri-map-pin-2-line"></i>
                            <p>3km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ServicosConcluidos;
