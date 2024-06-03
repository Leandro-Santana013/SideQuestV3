import React, { useContext, useEffect, useState } from 'react';
import "./Historico.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { SidebarCliente, Header, MenuBottomCliente } from '../../components';

function Historico() {
    const { Servicehistorico } = useContext(UserContext);
    const historicos = [
        {
            tipoServico: "Pintura de parede",
            nomeProf: "Vitor Roque",
            inicio: "10/02/2020 15:00h",
            fim: "13/02/2020 17:56h",
            categoria: "Elétrica"
        },
        {
            tipoServico: "Pintura de parede",
            nomeProf: "Vitor Roque",
            inicio: "10/02/2020 15:00h",
            fim: "13/02/2020 17:56h",
            categoria: "Elétrica"
        },
        {
            tipoServico: "Pintura de parede",
            nomeProf: "Vitor Roque",
            inicio: "10/02/2020 15:00h",
            fim: "13/02/2020 17:56h",
            categoria: "Elétrica"
        },
        {
            tipoServico: "Pintura de parede",
            nomeProf: "Vitor Roque",
            inicio: "10/02/2020 15:00h",
            fim: "13/02/2020 17:56h",
            categoria: "Elétrica"
        }
    ];

    return (
        <>
            <Header />
            <SidebarCliente />
            <MenuBottomCliente />
            <div className="content-midia">
            <div className="conteudo-historico ">
                <div className="header-historico">
                    <h2>Histórico</h2>
                    <div className="input-procurar">
                        <input type="text" placeholder="Procurar" />
                        <i className="ri-search-line"></i>
                    </div>
                </div>
                <div className="lista-historico">
                    <div className="hist-cabecalho">
                        <div className="coluna">Serviços</div>
                        <div className="coluna">Início</div>
                        <div className="coluna">Fim</div>
                        <div className="coluna">Categoria</div>
                    </div>
                    {Servicehistorico.length > 0 ? (
                    Servicehistorico.map((historico, index) => (
                        <div className="card-historico" key={index}>
                            <div className="coluna">
                                <div className="info-prof">
                                    <p className="desc-tipo-servico">{historico.ds_servico}</p>
                                    <p className="desc-nome-prof">Profissional: {historico.nm_profissional}</p>
                                </div>
                            </div>
                            <div className="coluna">
                                <p>{historico.dt_inicioServico}</p>
                            </div>
                            <div className="coluna">
                                <p>{historico.dt_terminoServico}</p>
                            </div>
                            <div className="coluna">
                                <p className="categoria">{historico.categoria}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mensagem-vazia">Nenhum historico encontrado.</p>
                )}
                </div>
            </div>
            </div>
        </>
    );
}

export default Historico;
