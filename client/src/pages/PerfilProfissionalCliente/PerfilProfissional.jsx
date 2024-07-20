import React, { useState, useEffect, useContext } from "react";
import "./perfilProfissional.css";
import { Link, useNavigate } from "react-router-dom";
import {
  SidebarProfissional,
  Header,
  MenuBottomProfissional,
  SidebarCliente,
  MenuBottomCliente,
} from "../../components";
import iconeperfil from "../../assets/icone-perfil.png";
import { useParams } from "react-router-dom";
import certificado from "../../assets/certificado.png";
import { ChatContext } from "../../context/ChatContext";
import {
  postRequest,
  favRequest,
  putRequest,
  getRequest,
} from "../../utils/services";
import { UserContext } from "../../context/UserContext";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiStarFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";

const PerfilProfissionalcli = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [profissional, setProfissional] = useState(null);
  const [imagens, setimagens] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [typeForm, setTypeForm] = useState(1);
  const [favoritado, setFavoritado] = useState(null);

  const handleForm = (n) => {
    setTypeForm(n);
  };

  useEffect(() => {
    console.log(typeForm);
  }, [typeForm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fazendo a solicitação para buscar informações do profissional com base no ID

        const response = await getRequest(`/user/perfil/profissionais/${id}`);
        setProfissional(response.pro);
        setimagens(response.images);
        console.log(response.comentario, "aaa")
        if (response.comentarios[0].avaliacao_id !== null) {
          setComentarios(response.comentarios);
        }
        if (user && user.id_cliente) {
          const response = await postRequest(`/user/perfil/profissionais/counter/${id}`);
        
          const fav = await favRequest(`/user/profissional/favoritado`, {
            id_cliente: user.id_cliente,
            id_profissional: Number(id),
            param: false,
          });

          setFavoritado(fav.user ? fav.user : null);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do profissional:", error);
        // Tratamento de erro adicional conforme necessário
      }
    };

    fetchData();
  }, [id, user]);

  useEffect(() => {
    console.log(profissional, "profissional setado");
  }, [profissional]);

  const handleClick = (u) => {
    if (user !== null) {
      createChat(user.id_cliente, u);
      window.location.href = "/chats";
    }
  };

  const favPro = async () => {
    const fav = await favRequest(`/user/profissional/favoritado`, {
      id_cliente: user.id_cliente,
      id_profissional: id,
      param: true,
    });
    console.log("bbbbbbbb", fav.user);
    setFavoritado(fav.user ? fav.user : null);
  };

  const handlePostarServico = (id_profissional) => {
    navigate(`/homeCliente/postarSevico`, { state: { id_profissional } });
  };

  console.log(profissional, "profissional");
  console.log(comentarios, 'comentarios')
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
                  {favoritado ? (
                    <FaStar className="icone-favoritado" />
                  ) : (
                    <FaStar className="icone-favoritar" />
                  )}
                </div>
                <img
                  src={
                    profissional && profissional.img_profissional
                      ? profissional.img_profissional
                      : iconeperfil
                  }
                  alt="Profile Picture"
                  className="profile-picture"
                />
                <div className="profile-info">
                  <h1 style={{ display: 'flex', alignItems: 'center' }}>
                    {profissional.nm_profissional}{" "}
                    <span
                      className={
                        onlineUsers?.some(
                          (user) =>
                            user?.userID == profissional.id_profissional &&
                            user.type == "pro"
                        )
                          ? "online-indicator"
                          : ""
                      }
                    >
                      {onlineUsers?.some(
                        (user) =>
                          user?.userID == profissional.id_profissional &&
                          user.type == "pro"
                      ) ? 'online' : ''}
                    </span>
                  </h1>
                  {profissional.sg_estado && profissional.nm_cidade && (
                    <p>
                      <i className="location-icon">
                        <MdOutlineLocationOn />
                      </i>
                      {profissional.nm_cidade}, {profissional.sg_estado}
                    </p>
                  )}
                </div>
                <div className="actions-buttons-profile">
                  <div
                    className="action-button-profile"
                    onClick={() => handleClick(id)}
                  >
                    Iniciar conversa
                  </div>
                  <div
                    className="action-button-profile"
                    onClick={() =>
                      handlePostarServico(profissional.id_profissional)
                    }
                  >
                    Enviar servico
                  </div>
                </div>
              </div>
              <div className="row-section">
                <div className="profile-section info-section">
                  <div className="section-header">
                    <h2>Informação profissional</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>Sobre:</strong>{" "}
                    </p>
                    <p>{profissional.ds_biografia}</p>
                  </div>
                  <p>numero de serviços terminados: <label>{profissional.num_servicos_terminados}</label></p>
                </div>
                <div className="profile-section areas-section">
                  <div className="section-header">
                    <h2>Áreas de atuação</h2>
                  </div>
                  <div className="section-content tags">
                    {profissional.tb_profissional_categoria.length > 0 ? (
                      profissional.tb_profissional_categoria.map(
                        (categoria, index) => (
                          <span className="tag" key={index}>
                            {categoria.tb_categorium.ds_categoria}
                          </span>
                        )
                      )
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
                    <p>({imagens?.length})</p>
                  </div>
                  <div className="section-content">
                    <div className="gallery">
                      {imagens?.length > 0 ? (
                        imagens.map((profile, index) => (
                          <img
                            key={index} // Unique key for each image
                            src={profile.img_profile}
                            alt={`Profile Image ${index + 1}`} // Add descriptive alt text
                            className="images"
                          />
                        ))
                      ) : (
                        <p>Nenhuma imagem foi encontrada</p>
                      )}
                    </div>
                  </div>
                </div>
                <div class="profile-section feedback-section">
                  <div class="section-header">
                    <h2>Avaliações</h2>
                    <p>{Number(profissional.media_avaliacoes).toFixed(1)}/5 ({comentarios?.length} avaliações)</p>
                  </div>
                  <div class="section-content">
                    <div class="feedback-list">
                      {comentarios ? comentarios.map((comentario, index) => (
                        <div class="feedback-box" key={comentario.avaliacao_id}>
                          <div className="feedback-author">
                            <img
                              src={
                                comentario.cliente_imagem
                                  ? comentario.cliente_imagem
                                  : iconeperfil
                              }
                              alt="Foto de perfil do autor do comentário"
                              className="feedback-profile-picture"
                            />
                            <div className="feedback-name-score">
                              <p class="author-name">{comentario.cliente_nome}</p>
                              <span className="feedback-score">
                                {[...Array(5)].map((_, index) => (
                                  <RiStarFill
                                    key={index}
                                    className={`ri-star-s-fill ${index < comentario.avaliacao_numero
                                      ? "ava" : ""}`}
                                  ></RiStarFill>
                                ))}
                              </span>
                            </div>
                          </div>
                          <p class="feedback-text">
                            {comentario.avaliacao_comentario}
                          </p>
                        </div>
                      )) : (<p>O profissional ainda não recebeu nenhuma avaliação</p>)}
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
};
export default PerfilProfissionalcli;
