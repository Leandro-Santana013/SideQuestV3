import React, { useContext, useEffect, useState } from 'react';
import { SidebarCliente, Header, MenuBottomCliente } from '../../components';
import imgPerfil from "../../assets/icone-perfil.png";
import "./Favoritos.css";
import "../../assets/remixicons/remixicon.css";

import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import balaoChat from '../../assets/balao-de-pensamento.png';
import { RiStarFill } from "react-icons/ri";
import { ChatContext } from '../../context/ChatContext';
import { postRequest, favRequest, baseUrl, getRequest, putRequest, } from "../../utils/services";
import { RiChat3Line, RiMegaphoneLine } from "react-icons/ri";

const ProfissionaisFavoritos = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { createChat } = useContext(ChatContext);
    const [favs, setFavs] = useState([]);
    const [favoritado, setFavoritado] = useState(null);

    useEffect(() => {
        const getFavs = async () => {
            if (user && user.id_cliente) {
                try {
                    const response = await getRequest(`/user/getFavs/${user.id_cliente}`);
                    setFavs(response);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getFavs();
    }, [user, favoritado]);

    const ClickCreateChat = (u) => {
        if (user !== null) {
            createChat(user.id_cliente, u);
            window.location.href = '/chats';
        }
    };

    const handlePostarServico = (id_profissional) => {
        navigate(`/homeCliente/postarSevico`, { state: { id_profissional } });
    };

    const favPro = async (id_profissional) => {
        try {
            const fav = await favRequest(`/user/profissional/favoritado`, { id_cliente: user.id_cliente, id_profissional, param: true });
            setFavoritado(fav.user ? fav.user : null);
            setFavs(prevFavs => prevFavs.filter(prof => prof.id_profissional !== id_profissional));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <SidebarCliente />
            <MenuBottomCliente />
            <div className="content-midia">
                <div className="conteudo-favoritos">
                    <div className="prof-fav-pesq">
                        <h2>Profissionais Favoritos</h2>
                        <div className="input-procurar">
                            <input type="text" placeholder="procurar" />
                            <i className="ri-search-line"></i>
                        </div>
                    </div>
                    <div className="area-profs">
                        <div className="prof-favoritos">
                            {favs && favs.length > 0 ? (
                                favs.map((profissional) => (
                                    <div className="card-prof-fav" key={profissional.id_profissional}>
                                        <Link to={`/homeCliente/perfilProfissional/${profissional.id_profissional}`}>
                                            <div className="info-prof-fav">
                                                <img src={profissional.img_profissional || imgPerfil} style={{ borderRadius: "50%" }} alt="imagem de perfil" />
                                                <p>{profissional.nm_profissional}</p>
                                            </div>
                                        </Link>
                                        <div className="actions-prof-fav">
                                            <i className={favoritado ? "icone-favoritado" : "icone-favoritar"} onClick={() => favPro(profissional.id_profissional)}><RiStarFill /></i>
                                            <i onClick={() => ClickCreateChat(profissional.id_profissional)}>
                                                <RiChat3Line />
                                            </i>
                                            <i onClick={() => handlePostarServico(profissional.id_profissional)}>
                                                <RiMegaphoneLine />
                                            </i>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='none-fav'>Nenhum favorito encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfissionaisFavoritos;
