import React, { useState, useEffect } from "react";
import "./VisualizarServicoProfissa.css";
import {  SidebarProfissional, Header } from "../../components/index";
import bandeira from "../../assets/bandeira.png";
import iconeperfil from "../../assets/icone-perfil.png";
import endereco from "../../assets/endereco.png";
import btnplay from "../../assets/botao-play.png";
import avaliacao from "../../assets/estrelinha.png";
import { useParams } from "react-router-dom";
import {
    postRequest, baseUrl, getRequest, putRequest,} from "../../utils/services";


const VisualizarServicoProfissa = () => {
    const { id } = useParams();
const [servico, setServico] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Fazendo a solicitação para buscar informações do profissional com base no ID
                const response = await getRequest(`/professional/servico/${id}`);
                // Configurando os dados do profissional no estado local
                setServico(response);
                console.log(response)
            } catch (error) {
                console.error("Erro ao buscar informações do profissional:", error);
                // Tratamento de erro adicional conforme necessário
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Header/>
           < SidebarProfissional/>  
            <div className="content-midia">
                <div className="main-content">
                <div className="card-visualizar">
                {servico  && (
                    <>
                    <div className="card-superior-servico">
                        
                        <div className="titulo-servico">
                            <h2>{servico.ds_titulo}</h2>
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
                            <img src={servico.img_cliente ? servico.img_cliente : iconeperfil} alt="icon-perfil" />
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
                            <p>{servico.ds_servico}</p>
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
                                <p>Postado há: {servico.diferencaTempo}</p>
                            </div>
                        </div>
                    
                    </div>
                    </>
                 )}
                </div>
                </div>
            </div>
        </>
    );
}

export default VisualizarServicoProfissa;