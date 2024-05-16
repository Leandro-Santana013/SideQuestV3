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
  return (
    <>
      <div className="input-filtros">
        <TextInputBusca placeholder={"Encontre profissionais"} />
        <div className="filtros">
          <p>Filtros</p>
          <RiFilter2Fill className="iconFilter" />
        </div>
      </div>

      {Dadosiniciais.map((servicos) => (
        <div className="card-servicoProfissa">
          <Link to={`/VisualizarServicoProfissa/${servicos.id_postagemServico}`}>
          <div className="icon-sucesso">
            <img src={imgSucesso} alt="Ícone de sucesso" />
          </div>
          <div className="desc-servico-usuario">
            <h2>{servicos.ds_titulo}</h2>
            <p>{servicos.ds_servico}</p>
            <div className="info-usuario">
              <p>Publicação: 2 Horas atrás</p>

              <div className="avaliacao">
                <img
                  style={{ borderRadius: "50%" }}
                  src={
                    servicos["tb_cliente.img_cliente"]
                      ? servicos["tb_cliente.img_cliente"]
                      : ImgPerfil
                  }
                  alt="Ícone de perfil"
                  id="perfil"
                />
                <p>{servicos["tb_cliente.nm_cliente"]}</p>
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
      ))}
    </>
  );
};
