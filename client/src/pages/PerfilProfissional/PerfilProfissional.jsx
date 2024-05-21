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
                                        <li onClick={() => { handleForm(2) }} style={{ color: typeForm === 2 ? "var(--verde)" : "inherit" }} >Mídia</li>
                                        <li onClick={() => { handleForm(3) }} style={{ color: typeForm === 3 ? "var(--verde)" : "inherit" }} >Avaliações</li>
                                    </ul>
                                </div>
                                <hr />
                            </div>
                            <div className="descricao-profissional">
                                <div className="info-pessoais">
                                    {
                                        typeForm === 1 && (
                                            <>
                                                <div className="avaliacoes">
                                                    {/* <button>Editar</button> */}
                                                    <h3>Avaliações:</h3>
                                                    <p>{Number(profissional[0].media_avaliacoes).toFixed(1)}</p>
                                                    <div className="stars">
                                                        {[...Array(5)].map((_, index) => (
                                                            <RiStarFill
                                                                key={index}
                                                                className={`ri-star-s-fill ${index < profissional[0].media_avaliacoes ? "ava" : ""}`}
                                                            ></RiStarFill>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="sobremim">
                                                    <h2>Sobre mim</h2>
                                                    <p>{profissional[0].ds_biografia}.</p>
                                                </div>
                                                <div className="servicos-realizados">
                                                    <img src={certificado} alt="certificado" />
                                                    <p>Serviços Realizados: {profissional[0].num_servicos_terminados}</p>
                                                </div>
                                            </>
                                        )}
                                    {
                                        typeForm === 2 && (
                                            <>
                                                <p> INFO 2 MIDIAS</p>
                                            </>
                                        )}
                                    {
                                        typeForm === 3 && (
                                            <>
                                                <p>array avaliações 3</p>
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
}

export default PerfilProfissional;