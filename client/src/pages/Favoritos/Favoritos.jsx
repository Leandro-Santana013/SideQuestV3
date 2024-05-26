import React, { useContext, useEffect, useState } from 'react';
import { SidebarCliente, Header, MenuBottomCliente } from '../../components';
import imgPerfil from "../../assets/icone-perfil.png";
import "./Favoritos.css";
import "../../assets/remixicons/remixicon.css";
import { getRequest } from '../../utils/services';
import { UserContext } from '../../context/UserContext';
import { Link,  useNavigate  } from 'react-router-dom';
import balaoChat from '../../assets/balao-de-pensamento.png';
import { ChatContext } from '../../context/ChatContext';
import { RiChat3Line, RiMegaphoneLine } from "react-icons/ri";
const ProfissionaisFavoritos = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const {createChat} = useContext(ChatContext)
    const [favs, setFavs] = useState([]);
    useEffect(() => {
        const getFavs = async () => {
            if (user && user.id_cliente) {
                try {
                    const response = await getRequest(`/user/getFavs/${user.id_cliente}`);
                    setFavs(response);
                    console.log("brasil", response)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getFavs()
    }, [user])




    const ClickCreateChat = (u) => {
        if (user !== null) {
            createChat(user.id_cliente, u);
            window.location.href = '/chats';
        }

    };

    const handlePostarServico = (id_profissional) => {
        navigate(`/homeCliente/postarSevico`, { state: { id_profissional } });
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
                                                <img src={profissional.img_profissional || imgPerfil} alt="imagem de perfil" />
                                                <p>{profissional.nm_profissional}</p>
                                            </div>
                                        </Link>
                                        <div className="actions-prof-fav">
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
                                <p>Nenhum favorito encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfissionaisFavoritos;
