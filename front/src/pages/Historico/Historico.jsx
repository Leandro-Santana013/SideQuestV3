import React from 'react';
import "./Historico.css";
import { SidebarCliente, Header } from '../../components';

function Historico() {
    return (
        <>
            <Header />
            <SidebarCliente />
            <div className="content-midia">
                <div className="conteudo-historico">
                    <div className="hist-pesq">
                        <h2>Histórico</h2>
                        <div className="input-procurar">
                            <input type="text" placeholder="procurar" />
                            <i className="ri-search-line"></i>
                        </div>
                    </div>

                    <div className="area-historico">
                        <div className="historicos">
                            <div className="hist-cabecalho">
                                <div className="alinhador">
                                    <p>Serviços</p>
                                </div>
                                <div className="alinhador">
                                    <p>Início</p>
                                </div>
                                <div className="alinhador">
                                    <p>Fim</p>
                                </div>
                                <div className="alinhador">
                                    <p>Categoria</p>
                                </div>
                            </div>

                            <div className="card-historico">
                                <div className="alinhador">
                                    <div className="info-prof">
                                        <p className="desc-tipo-servico">Pintura de parede</p>
                                        <p className="desc-nome-prof">Profissional: Vitor Roque</p>
                                    </div>
                                </div>

                                <div className="alinhador">
                                    <p>10/02/2020 15:00h</p>
                                </div>

                                <div className="alinhador">
                                    <p>13/02/2020 17:56h</p>
                                </div>

                                <div className="alinhador">
                                    <div className="categoria">
                                        <p>Elétrica</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-historico">
                                <div className="alinhador">
                                    <div className="info-prof">
                                        <p className="desc-tipo-servico">Pintura de parede</p>
                                        <p className="desc-nome-prof">Profissional: Vitor Roque</p>
                                    </div>
                                </div>

                                <div className="alinhador">
                                    <p>10/02/2020 15:00h</p>
                                </div>

                                <div className="alinhador">
                                    <p>13/02/2020 17:56h</p>
                                </div>

                                <div className="alinhador">
                                    <div className="categoria">
                                        <p>Elétrica</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-historico">
                                <div className="alinhador">
                                    <div className="info-prof">
                                        <p className="desc-tipo-servico">Pintura de parede</p>
                                        <p className="desc-nome-prof">Profissional: Vitor Roque</p>
                                    </div>
                                </div>

                                <div className="alinhador">
                                    <p>10/02/2020 15:00h</p>
                                </div>

                                <div className="alinhador">
                                    <p>13/02/2020 17:56h</p>
                                </div>

                                <div className="alinhador">
                                    <div className="categoria">
                                        <p>Elétrica</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card-historico">
                                <div className="alinhador">
                                    <div className="info-prof">
                                        <p className="desc-tipo-servico">Pintura de parede</p>
                                        <p className="desc-nome-prof">Profissional: Vitor Roque</p>
                                    </div>
                                </div>

                                <div className="alinhador">
                                    <p>10/02/2020 15:00h</p>
                                </div>

                                <div className="alinhador">
                                    <p>13/02/2020 17:56h</p>
                                </div>

                                <div className="alinhador">
                                    <div className="categoria">
                                        <p>Elétrica</p>
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

export default Historico;

