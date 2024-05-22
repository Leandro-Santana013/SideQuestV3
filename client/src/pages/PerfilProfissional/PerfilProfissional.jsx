import React, { useState, useEffect, useContext } from "react";
import "./perfilProfissional.css";
import { Link } from "react-router-dom";
import { SidebarProfissional, Header, SidebarCliente } from "../../components";
import iconeperfil from "../../assets/icone-perfil.png";
import { useParams } from "react-router-dom";
import medalhaouro from "../../assets/medalhaouro.png"
import medalha10k from "../../assets/medalha10k.png";
import medalhabronze from "../../assets/medalha10k.png";
import estrelas from "../../assets/estrelinha.png";
import agenda from "../../assets/agenda.png";
import certificado from "../../assets/certificado.png";
import { ChatContext } from "../../context/ChatContext";
import { postRequest, baseUrl, getRequest, putRequest, } from "../../utils/services";
import { UserContext } from "../../context/UserContext";

import { RiFilter2Fill, RiStarFill } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";

const PerfilProfissional = () => {
    const { id } = useParams();
    const { createChat, onlineUsers } = useContext(ChatContext);
    const { user } = useContext(UserContext)
    const [profissional, setProfissional] = useState(null);
    const [typeForm, setTypeForm] = useState(1)

    const handleForm = (n) => {
        setTypeForm(n)
    }

    useEffect(() => {
        console.log(typeForm)
    }, [typeForm])


    useEffect(() => {

        const fetchData = async () => {
            try {
                // Fazendo a solicitação para buscar informações do profissional com base no ID
                const response = await getRequest(`/user/perfil/profissionais/${id}`);
                // Configurando os dados do profissional no estado local
                setProfissional(response);
                console.log('krl', response)
            } catch (error) {
                console.error("Erro ao buscar informações do profissional:", error);
                // Tratamento de erro adicional conforme necessário
            }
        };

        fetchData();
    }, [id]);

    const handleClick = (u) => {
        if (user !== null) {

            createChat(user.id_cliente, u);
            window.location.href = '/chats';
        }

    };
    return (
        <>
            <Header />
            <SidebarCliente />
            <section className="content-midia">
                <div className="main-content">
                    {profissional && (
                        <div className="perfil-profissional">
                            <Link to='/homeCliente'>
                                <button className="btn-voltar-perfil-profissional">
                                    <FaAngleLeft />
                                </button>
                            </Link>
                            <div className="cabecalho-perfil">
                                <div className="perfil-nome">
                                    <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="icone de perfil" />
                                    <span className={
                                        onlineUsers?.some((user) => user?.userID == profissional[0].id_profissional && user.type == "pro") ?
                                            "user-online" : ""}></span>
                                    <div className="nome-profissao">
                                        <h1>{profissional[0].nm_profissional}</h1>
                                        <div className="profissoes-profissional">
                                            <p>Profissões:</p>
                                            <p>Eletricista</p>
                                        </div>
                                        <div className="iniciar-conversa" onClick={() => handleClick(id)}>Iniciar conversa</div>
                                    </div>
                                </div>
                                <div className="menu-perfil">
                                    <ul>
                                        <li onClick={() => handleForm(1)} style={{ color: typeForm === 1 ? "var(--verde)" : "inherit" }}>Sobre</li>
                                        <li onClick={() => { handleForm(2) }} style={{ color: typeForm === 2 ? "var(--verde)" : "inherit" }} >Avaliações</li>
                                    </ul>
                                </div>
                                <div className="linha-separadora"></div>
                            </div>
                            <div className="descricao-profissional">
                                <div className="info-pessoais">
                                    {
                                        typeForm === 1 && (
                                            <>

                                                <div className="sobremim">
                                                    <h2>Sobre mim</h2>
                                                    <p>{profissional[0].ds_biografia}.</p>
                                                </div>
                                                <div className="servicos-realizados">
                                                    <img src={certificado} alt="certificado" />
                                                    <p>Serviços Realizados: {profissional[0].num_servicos_terminados}</p>
                                                </div>
                                                <div className="portifolio-profissional">
                                                    <div className="titulo-portifolio-profissional">
                                                        <h1>Portifólio do Profissional</h1>
                                                    </div>
                                                    <div className="servicos-portifolio-profissional">
                                                        <h2>Aqui você pode visualizar todos os serviços realizado por esse profissional!</h2>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    {
                                        typeForm === 2 && (
                                            <>
                                                <div className="avaliacoes">
                                                    {/* <span>{profissional[0].num_avaliacoes}</span> */}
                                                    <div className="avaliacoes-media-star">
                                                        <p>{Number(profissional[0].media_avaliacoes).toFixed(1)}</p>
                                                        <div className="stars">
                                                            {[...Array(5)].map((_, index) => (
                                                                <RiStarFill
                                                                    key={index}
                                                                    className={`ri-star-s-fill ${index < profissional[0].media_avaliacoes ? "ava" : ""}`}
                                                                    style={{fontSize: '3vw'}}
                                                                ></RiStarFill>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="avaliacao-avaliacoes">
                                                        {profissional[2].map((avaliacao, index) => (
                                                            <div key={index} className="avaliacao-card">
                                                                <div className="texto-comentario-avaliacao-card"></div>
                                                                <div className="left-avaliacao-card">
                                                                    <img src={avaliacao.cliente_imagem ? avaliacao.cliente_imagem : iconeperfil} alt="Imagem de perfil do cliente" />
                                                                    <span>{avaliacao.cliente_nome}</span>
                                                                </div>
                                                            </div>
                                                        ))}                                                
                                                </div>
                                            </>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );

//     avaliacao_comentario
// : 
// "Excelente serviço, profissional muito experiente."
// avaliacao_id
// : 
// 11
// avaliacao_numero
// : 
// 5
// cliente_id
// : 
// 11
// cliente_imagem
// : 
// null
// cliente_nome
// : 
// "Gustavo Oliveira"
}

export default PerfilProfissional;