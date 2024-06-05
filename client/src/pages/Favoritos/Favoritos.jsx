import React, { useContext, useEffect, useState } from 'react';
import { SidebarCliente, Header, MenuBottomCliente } from '../../components';
import imgPerfil from "../../assets/icone-perfil.png";
import "./Favoritos.css";
import "../../assets/remixicons/remixicon.css";
import { RiSearch2Line } from "react-icons/ri";
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { RiChat3Line, RiMegaphoneLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { ChatContext } from '../../context/ChatContext';
import { getRequest, favRequest } from "../../utils/services";

const ProfissionaisFavoritos = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { createChat } = useContext(ChatContext);
    const [favs, setFavs] = useState([]);
    const [favoritado, setFavoritado] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFavs, setFilteredFavs] = useState([]);

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

    useEffect(() => {
        setFilteredFavs(
            favs.filter(profissional =>
                profissional.nm_profissional.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, favs]);

    const handleClickCreateChat = (u) => {
        if (user !== null) {
            createChat(user.id_cliente, u);
            window.location.href = '/chats';
        }
    };

    const handlePostarServico = (id_profissional) => {
        navigate(`/homeCliente/postarSevico`, { state: { id_profissional } });
    };

    const handleFavoritar = async (id_profissional) => {
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
                <div className='main-content'>
                    <div className="content-favoritos">
                        <div className="header-favoritos">
                            <h2>Profissionais Favoritos</h2>
                            <div className="input-procurar">
                                <input
                                    type="text"
                                    placeholder="Procurar"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                <i><RiSearch2Line /></i>
                            </div>
                        </div>
                        <div className="lista-favoritos">
                            {filteredFavs.length > 0 ? (
                                filteredFavs.map((profissional) => (
                                    <div className="card-favorito" key={profissional.id_profissional}>
                                        <Link to={`/homeCliente/perfilProfissional/${profissional.id_profissional}`} className="info-favorito">
                                            <img src={profissional.img_profissional || imgPerfil} alt="Imagem de perfil" className="img-perfil-favoritos" />
                                            <p>{profissional.nm_profissional}</p>
                                        </Link>
                                        <div className="acoes-favorito">
                                            <button onClick={() => handleFavoritar(profissional.id_profissional)} className="btn-favoritar">
                                                <FaStar className={favoritado ? "icone-favoritado" : "icone-favoritar"} />
                                            </button>
                                            <button onClick={() => handleClickCreateChat(profissional.id_profissional)} className="btn-chat">
                                                <RiChat3Line />
                                            </button>
                                            <button onClick={() => handlePostarServico(profissional.id_profissional)} className="btn-servico">
                                                <RiMegaphoneLine />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="mensagem-vazia">Nenhum favorito encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfissionaisFavoritos;
