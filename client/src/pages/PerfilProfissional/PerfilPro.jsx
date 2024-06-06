  import React, { useState, useEffect, useContext } from "react";
  import "./perfilPro.css";
  import { Link, useNavigate } from "react-router-dom";
  import {
    SidebarProfissional,
    Header,
    MenuBottomProfissional,
    SidebarCliente,
    MenuBottomCliente,
  } from "../../components";
  import {
    RiArrowLeftLine,
    RiListUnordered,
    RiQuestionLine,
    RiAttachment2,
  } from "react-icons/ri";
  import iconeperfil from "../../assets/icone-perfil.png";

  import { ChatContext } from "../../context/ChatContext";
  import {
    postRequest,
    favRequest,
    putRequest,
    getRequest,
  } from "../../utils/services";
  import { ProfessionalContext } from "../../context/ProfissionalContext";
  import { MdOutlineLocationOn } from "react-icons/md";
  import { RiStarFill } from "react-icons/ri";

  const PerfilProfissional = () => {
    const { createChat } = useContext(ChatContext);
    const {
      profissional,
      imagens,
      comentario,
      saveimg,
      setImagesInstance,
      imagemSelecionada,
      setImagemSelecionada,
    } = useContext(ProfessionalContext);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagemSelecionada(reader.result);
        setImagesInstance((param) => ({
          ...param,
          img_galeria: reader.result,
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    console.log(profissional, "profissional");

    return (
      <>
        <Header />
        <SidebarProfissional />
        <MenuBottomProfissional />
        <section className="content-midia">
          <div className="main-content">
            {profissional && (
              <div className="profile-container">
                <div className="profile-header">
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
                    <h1>{profissional.nm_profissional}</h1>
                    {profissional.sg_estado && profissional.nm_cidade && (
                      <p>
                        <i className="location-icon">
                          <MdOutlineLocationOn />
                        </i>
                        {profissional.nm_cidade}, {profissional.sg_estado}
                      </p>
                    )}
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
                      <input
                        type="file"
                        id="anexo"
                        className="anexo"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="anexo" className="anexoLabel">
                        Anexo
                        <RiAttachment2 className="iconAnexo" />
                      </label>
                      <div className="gallery">
                        {imagemSelecionada && (
                          <>
                            <div>
                              <h2>Imagem Selecionada:</h2>
                              <img
                                src={imagemSelecionada}
                                alt="Imagem Selecionada"
                              />
                              <button
                                onClick={() => {
                                  saveimg();
                                }}
                              >
                                salvar
                              </button>
                              <button
                                onClick={() => {
                                  setImagemSelecionada(null);
                                }}
                              >
                                cancelar
                              </button>
                            </div>
                          </>
                        )}
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
                          <p>Sem imagens</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="profile-section feedback-section">
                    <div class="section-header">
                      <h2>Avaliações</h2>
                      <p>4.5/5 (396 opniões)</p>
                    </div>
                    <div class="section-content">
                      <div class="feedback-list">
                        <div class="feedback-box">
                          <div className="feedback-author">
                            <img
                              src={
                                profissional && profissional.img_profissional
                                  ? profissional.img_profissional
                                  : iconeperfil
                              }
                              alt="Foto de perfil do autor do comentário"
                              className="feedback-profile-picture"
                            />
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
                          <p class="feedback-text">
                            Excelente serviço e muito profissional!
                          </p>
                        </div>
                        <div class="feedback-box">
                          <div className="feedback-author">
                            <img
                              src={
                                profissional && profissional.img_profissional
                                  ? profissional.img_profissional
                                  : iconeperfil
                              }
                              alt="Foto de perfil do autor do comentário"
                              className="feedback-profile-picture"
                            />
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
                          <p class="feedback-text">
                            Excelente serviço e muito profissional!
                          </p>
                        </div>
                        <div class="feedback-box">
                          <div className="feedback-author">
                            <img
                              src={
                                profissional && profissional.img_profissional
                                  ? profissional.img_profissional
                                  : iconeperfil
                              }
                              alt="Foto de perfil do autor do comentário"
                              className="feedback-profile-picture"
                            />
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
                          <p class="feedback-text">
                            Excelente serviço e muito profissional!
                          </p>
                        </div>
                      </div>
                      <div class="feedback-box">
                        <div className="feedback-author">
                          <img
                            src={
                              profissional && profissional.img_profissional
                                ? profissional.img_profissional
                                : iconeperfil
                            }
                            alt="Foto de perfil do autor do comentário"
                            className="feedback-profile-picture"
                          />
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
                        <p class="feedback-text">
                          Excelente serviço e muito profissional!
                        </p>
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
  export default PerfilProfissional;
