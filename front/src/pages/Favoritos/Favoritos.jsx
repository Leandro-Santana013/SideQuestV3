import React from 'react';
import { SidebarCliente, Header } from '../../components';
import imgPerfil from "../../assets/icone-perfil.png";
import "./Favoritos.css";
import "../../assets/remixicons/remixicon.css";

function ProfissionaisFavoritos() {
    return (
        <>
            <Header />
            <SidebarCliente />
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
                            <div className="card-prof-fav">
                                <div className="info-prof-fav">
                                    <img src={imgPerfil} alt="imagem de perfil" />
                                    <p>João Kleber</p>
                                </div>
                                <div className="actions-prof-fav">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-wechat-line"></i>
                                    <i className="ri-megaphone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="prof-favoritos">
                            <div className="card-prof-fav">
                                <div className="info-prof-fav">
                                    <img src={imgPerfil} alt="imagem de perfil" />
                                    <p>João Kleber</p>
                                </div>
                                <div className="actions-prof-fav">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-wechat-line"></i>
                                    <i className="ri-megaphone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="prof-favoritos">
                            <div className="card-prof-fav">
                                <div className="info-prof-fav">
                                    <img src={imgPerfil} alt="imagem de perfil" />
                                    <p>João Kleber</p>
                                </div>
                                <div className="actions-prof-fav">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-wechat-line"></i>
                                    <i className="ri-megaphone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="prof-favoritos">
                            <div className="card-prof-fav">
                                <div className="info-prof-fav">
                                    <img src={imgPerfil} alt="imagem de perfil" />
                                    <p>João Kleber</p>
                                </div>
                                <div className="actions-prof-fav">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-wechat-line"></i>
                                    <i className="ri-megaphone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="prof-favoritos">
                            <div className="card-prof-fav">
                                <div className="info-prof-fav">
                                    <img src={imgPerfil} alt="imagem de perfil" />
                                    <p>João Kleber</p>
                                </div>
                                <div className="actions-prof-fav">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-wechat-line"></i>
                                    <i className="ri-megaphone-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="prof-favoritos">
                            <div className="card-prof-fav">
                                <div className="info-prof-fav">
                                    <img src={imgPerfil} alt="imagem de perfil" />
                                    <p>João Kleber</p>
                                </div>
                                <div className="actions-prof-fav">
                                    <i className="ri-star-fill"></i>
                                    <i className="ri-wechat-line"></i>
                                    <i className="ri-megaphone-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfissionaisFavoritos;
