import React, { useState, useEffect, useContext } from "react";
import "./cardServico.css";
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import { TextInputBusca } from "../index";
import { RiFilter2Fill } from "react-icons/ri";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProfessionalContext } from "../../context/ProfissionalContext";

export const CardServico = () => {
  const { Dadosiniciais } = useContext(ProfessionalContext);

  // Verificar se Dadosiniciais é um array, se não, definir como array vazio
  const servicos = Array.isArray(Dadosiniciais) ? Dadosiniciais : [];

  return (
    <>
      <div className="input-filtros">
        <TextInputBusca placeholder={"Encontre profissionais"} />
        <div className="filtros">
          <p>Filtros</p>
          <RiFilter2Fill className="iconFilter" />
        </div>
      </div>

      {servicos.length > 0 ? (
        servicos.map((servico) => (
          <div className="card-servicoProfissa" key={servico.id_postagemServico}>
            <Link to={`/VisualizarServicoProfissa/${servico.id_postagemServico}`}>
              <div className="icon-sucesso">
                <img src={imgSucesso} alt="Ícone de sucesso" />
              </div>
              <div className="desc-servico-usuario">
                <h2>{servico.ds_titulo}</h2>
                <p>{servico.ds_servico}</p>
                <div className="info-usuario">
                  <p>Publicação: 2 Horas atrás</p>
                  <div className="avaliacao">
                    <img
                      style={{ borderRadius: "50%" }}
                      src={servico["tb_cliente.img_cliente"] ? servico["tb_cliente.img_cliente"] : ImgPerfil}
                      alt="Ícone de perfil"
                      id="perfil"
                    />
                    <p>{servico["tb_cliente.nm_cliente"]}</p>
                    <i className="fa-regular fa-star"></i>
                    <p>4.9</p>
                  </div>
                </div>
              </div>
              <div className="btn-distancia">
                <button>Ver mais</button>
                <div className="distancia">
                  <i className="ri-map-pin-2-line"></i>
                  <p>3km</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>Nenhum serviço encontrado.</p>
      )}
    </>
  );
};
