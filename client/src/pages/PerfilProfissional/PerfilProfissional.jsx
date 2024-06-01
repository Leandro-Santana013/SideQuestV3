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
                        <div className="profile-container galery-section">
                            <div className="profile-header">
                                <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Profile Picture" className="profile-picture" />
                                <div className="profile-info">
                                    <h1>{profissional.nm_profissional}</h1>
                                    <p><i className="location-icon"><MdOutlineLocationOn /></i> São Vicente, SP</p>
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
                                <div className="profile-section">
                                    <div className="section-header">
                                        <h2>Galeria de trabalhos</h2>
                                    </div>
                                    <div className="section-content gallery-section">
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
            </div>
            <div class="section-content">
                <div class="feedback-list">
                    <div class="feedback-box">
                        <div className="feedback-author">
                    <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} alt="Foto de perfil do autor do comentário" className="feedback-profile-picture" />
                        <div className="feedback-name-score">
                        <p class="author-name">Joao manuel</p>
                        <span className="feedback-score">
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
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
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
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
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
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
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
                            <RiStarFill/>
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


// {profissional && (
//     <div className="perfil-profissional">
//         <div className="cabecalho-perfil">
//             <Link to='/homeCliente'>
//                 <button className="btn-voltar-perfil-profissional">
//                     <FaAngleLeft />
//                 </button>
//             </Link>
//             <div className="perfil-nome">
//                 <img src={profissional && profissional.img_profissional ? profissional.img_profissional : iconeperfil} /alt="icone de perfil" />
//                 <span className={
//                     onlineUsers?.some((user) => user?.userID == profissional.id_profissional && user.type == "pro") ?
//                         "user-online" : ""}></span>
//                 <div className="nome-profissao">
//                     <h1>{profissional.nm_profissional}</h1>
//                     <div className="profissoes-profissional">
//                         {profissional.tb_profissional_categoria.length > 0 ? (
//                             profissional.tb_profissional_categoria.map((categoria, index) => (
//                                 <p key={index}>{categoria.tb_categorium.ds_categoria}</p>
//                             ))
//                         ) : (
//                             <p>Nenhuma categoria encontrada</p>
//                         )}
//                     </div>


//                 </div>
//             </div>
//             <div className="menu-perfil">
//                 <ul style={{ cursor: 'pointer' }}>

//                     <div className={favoritado ? "icone-favoritado" : "icone-favoritar"} onClick={favPro}><RiStarFill /></div>
//                     <li onClick={() => handleForm(1)} style={{ color: typeForm === 1 ? "var(--verde)" : "inherit" }}>Sobre</li>
//                     <li onClick={() => { handleForm(2) }} style={{ color: typeForm === 2 ? "var(--verde)" : "inherit" }} >Avaliações</li>
//                 </ul>
//             </div>
//             <div className="linha-separadora"></div>
//         </div>
//         <div className="descricao-profissional">
//             <div className="iniciar-conversa" onClick={() => handleClick(id)}>Iniciar conversa</div>
//             <div className="iniciar-conversa" onClick={() => handlePostarServico(profissional.id_profissional)}>Enviar servico</div>
//             <div className="info-pessoais">
//                 {
//                     typeForm === 1 && (
//                         <>

//                             <div className="sobremim-profissional">
//                                 <h2>Sobre mim</h2>
//                                 <p>{profissional.ds_biografia}</p>
//                             </div>
//                             <div className="servicos-realizados">
//                                 <img src={certificado} alt="certi/ficado" />
//                                 <p>Serviços Realizados: {profissional.num_servicos_terminados}</p>
//                             </div>
//                             <div className="portifolio-profissional">
//                                 <div className="titulo-portifolio-profissional">
//                                     <h1>Portifólio do Profissional</h1>
//                                 </div>
//                                 <div className="servicos-portifolio-profissional">
//                                     <h2>Aqui você pode visualizar todos os serviços realizado por esse profissional!</h2>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 {
//                     typeForm === 2 && (
//                         <>
//                             <div className="avaliacoes">
//                                 {/* <span>{profissional[0].num_avaliacoes}</span> */}
//                                 <div className="avaliacoes-media-star">
//                                     <div className="stars">
//                                         {[...Array(5)].map((_, index) => (
//                                             <RiStarFill
//                                                 key={index}
//                                                 className={`ri-star-s-fill ${index < profissional.media_avaliacoes ? "ava" : ""}`}
//                                                 style={{ fontSize: '3vw' }}
//                                             ></RiStarFill>
//                                         ))}
//                                     </div>
//                                     <p>{Number(profissional.media_avaliacoes).toFixed(1)}</p>
//                                 </div>
//                             </div>
//                             <div className="avaliacao-avaliacoes">
//                                 {/* {profissional.map((avaliacao, index) => (
//                                     <div key={index} className="avaliacao-card">
//                                         <p>{avaliacao.cliente_nome} avaliou com <span>{avaliacao.avaliacao_numero} estrelas</span></p>
//                                         <div className="texto-comentario-avaliacao-card">
//                                             <p>{avaliacao.avaliacao_comentario}</p>
//                                         </div>
//                                         <div className="bottom-avaliacao-card">
//                                             <img src={avaliacao.cliente_image/m ? avaliacao.cliente_imagem : iconeperfil} alt="Imagem de perfil do cliente" />
//                                             <span>{avaliacao.cliente_nome}</span>
//                                         </div>
//                                     </div>
//                                 ))} */}
//                             </div>
//                         </>
//                     )}
//             </div>
//         </div>
//     </div>
// )}

export default PerfilProfissional;