import React, { useState, useEffect, useContext } from "react";
import "./perfilProfissional.css";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProfissional, Header, MenuBottomProfissional, SidebarCliente, MenuBottomCliente } from "../../components";
import iconeperfil from "../../assets/icone-perfil.png";
import { useParams } from "react-router-dom";
import certificado from "../../assets/certificado.png";
import { ChatContext } from "../../context/ChatContext";
import { postRequest, favRequest, putRequest, getRequest } from "../../utils/services";
import { UserContext } from "../../context/UserContext";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiStarFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

const PerfilProfissional = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { createChat, onlineUsers } = useContext(ChatContext);
    const { user } = useContext(UserContext)
    const [profissional, setProfissional] = useState(null);
    const [imagens, setimagens] = useState(null);
    const [comentario, setComentarios] = useState(null)
    const [typeForm, setTypeForm] = useState(1)
    const [favoritado, setFavoritado] = useState(null)



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
                setProfissional(response.pro);
                setimagens(response.imagens)
                setComentarios(response.comentarios)
                if (user && user.id_cliente) {
                    const fav = await favRequest(`/user/profissional/favoritado`, { id_cliente: user.id_cliente, id_profissional: Number(id), param: false })
                    // Configurando os dados do profissional no estado local
                    console.log("aaaaaaaaaaaaaaaaaaa", fav)
                    setFavoritado(fav.user ? fav.user : null)
                }
            } catch (error) {
                console.error("Erro ao buscar informações do profissional:", error);
                // Tratamento de erro adicional conforme necessário
            }
        };

        fetchData();
    }, [id, user]);

    useEffect(() => {
        console.log(profissional, "profissional setado")
    }, [profissional])

    const handleClick = (u) => {
        if (user !== null) {

            createChat(user.id_cliente, u);
            window.location.href = '/chats';
        }

    };

    const favPro = async () => {
        const fav = await favRequest(`/user/profissional/favoritado`, { id_cliente: user.id_cliente, id_profissional: id, param: true })
        console.log("bbbbbbbb", fav.user)
        setFavoritado(fav.user ? fav.user : null)
    }

    const handlePostarServico = (id_profissional) => {
        navigate(`/homeCliente/postarSevico`, { state: { id_profissional } });
    };

    console.log(profissional, "profissional")

    return (
        <>
            <Header />
            <SidebarCliente />
            <MenuBottomCliente />
            <section className="content-midia">
                <div className="main-content">
                    {profissional && (
                        <div className="profile-container">
                            <div className="profile-header">
                    
                            <div className="favorite-icon" onClick={favPro}>
                                    {favoritado ? <FaStar className="icone-favoritado" /> : <FaStar className="icone-favoritar" />}
                                </div>
                                <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Profile Picture" className="profile-picture" />
                                <div className="profile-info">
                                    <h1>{profissional.nm_profissional} <span className={
                                    onlineUsers?.some((user) => user?.userID == profissional.id_profissional && user.type == "pro") ?
                                        "online-indicator" : ""}>online</span></h1>
                                    {profissional.sg_estado && profissional.nm_cidade  && <p><i className="location-icon"><MdOutlineLocationOn /></i>{profissional.nm_cidade}, {profissional.sg_estado}</p> }
                                </div>
                                <div className="actions-buttons-profile">
                                    <div className="action-button-profile" onClick={() => handleClick(id)}>Iniciar conversa</div>
                                    <div className="action-button-profile" onClick={() => handlePostarServico(profissional.id_profissional)}>Enviar servico</div>
                                    
                                </div>
                            </div>
                            <div className="row-section">
                                <div className="profile-section info-section">
                                    <div className="section-header">
                                        <h2>Informação profissional</h2>
                                    </div>
                                    <div className="section-content">
                                        <p><strong>Sobre:</strong> </p>
                                        <p>{profissional.ds_biografia}</p>
                                    </div>  
                                </div>
                                <div className="profile-section areas-section">
                                    <div className="section-header">
                                        <h2>Áreas de atuação</h2>
                                    </div>
                                    <div className="section-content tags">
                                        {profissional.tb_profissional_categoria.length > 0 ? (
                                            profissional.tb_profissional_categoria.map((categoria, index) => (
                                                <span className="tag" key={index}>{categoria.tb_categorium.ds_categoria}</span>
                                            ))
                                        ) : (
                                            <p>Nenhuma categoria encontrada</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row-section">
                                <div className="profile-section  gallery-section">
                                    <div className="section-header">
                                        <h2>Galeria de trabalhos </h2>
                                        <p>(6)</p>
                                    </div>
                                    <div className="section-content">
                                        <div className="gallery">
                                            <div className="images" alt="Trabalho 1" />
                                            <div className="images" alt="Trabalho 2" />
                                            <div className="images" alt="Trabalho 3" />
                                            <div className="images" alt="Trabalho 4" />
                                            <div className="images" alt="Trabalho 5" />
                                            <div className="images" alt="Trabalho 6" />
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-section feedback-section">
                                    <div class="section-header">
                                        <h2>Avaliações</h2>
                                        <p>
                                            4.5/5 (396 opniões)
                                        </p>
                                    </div>
                                    <div class="section-content">
                                        <div class="feedback-list">
                                            <div class="feedback-box">
                                                <div className="feedback-author">
                                                    <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Foto de perfil do autor do comentário" className="feedback-profile-picture" />
                                                    <div className="feedback-name-score">
                                                        <p class="author-name">Joao manuel</p>
                                                        <span className="feedback-score">
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                        </span>
                                                    </div>
                                                </div>
                                                <p class="feedback-text">Excelente serviço e muito profissional!</p>
                                            </div>
                                            <div class="feedback-box">
                                                <div className="feedback-author">
                                                    <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Foto de perfil do autor do comentário" className="feedback-profile-picture" />
                                                    <div className="feedback-name-score">
                                                        <p class="author-name">Joao manuel</p>
                                                        <span className="feedback-score">
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                        </span>
                                                    </div>
                                                </div>
                                                <p class="feedback-text">Excelente serviço e muito profissional!</p>
                                            </div>
                                            <div class="feedback-box">
                                                <div className="feedback-author">
                                                    <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Foto de perfil do autor do comentário" className="feedback-profile-picture" />
                                                    <div className="feedback-name-score">
                                                        <p class="author-name">Joao manuel</p>
                                                        <span className="feedback-score">
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                            <RiStarFill />
                                                        </span>
                                                    </div>
                                                </div>
                                                <p class="feedback-text">Excelente serviço e muito profissional!</p>
                                            </div>
                                        </div>
                                        <div class="feedback-box">
                                            <div className="feedback-author">
                                                <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Foto de perfil do autor do comentário" className="feedback-profile-picture" />
                                                <div className="feedback-name-score">
                                                    <p class="author-name">Joao manuel</p>
                                                    <span className="feedback-score">
                                                        <RiStarFill />
                                                        <RiStarFill />
                                                        <RiStarFill />
                                                        <RiStarFill />
                                                        <RiStarFill />
                                                    </span>
                                                </div>
                                            </div>
                                            <p class="feedback-text">Excelente serviço e muito profissional!</p>
                                        </div>
                                    </div>
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