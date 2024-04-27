import React, { useState, useEffect } from "react";
import "./cardServico.css";
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import { TextInputBusca } from "../index";
import { RiFilter2Fill } from "react-icons/ri";
import axios from "axios";

export const CardServico = () => {
  const [Dadosiniciais, setDadosIniciais] = useState([]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/professional/servicoscard"
      );
      setDadosIniciais(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
      // Tratamento de erro adicional conforme necessário
    }
  };

 

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <>
      <div className="input-filtros">
        <TextInputBusca placeholder={"Encontre profissionais"} />
        <div className="filtros">
          <p>Filtros</p>
          <RiFilter2Fill className="iconFilter" />
        </div>
      </div>

      {(
        Dadosiniciais.map((servicos) => (
      <div className="card-servicoProfissa">
        <div className="icon-sucesso">
          <img src={imgSucesso} alt="Ícone de sucesso" />
        </div>
        <div className="desc-servico-usuario">
          <h2>{servicos.ds_titulo}</h2>
          <p>
          {servicos.ds_servico}
          </p>
          <div className="info-usuario">
            <p>Publicação: 2 Horas atrás</p>
            <div className="avaliacao">
              <img src={ImgPerfil} alt="Ícone de perfil" id="perfil" />
              <p>{servicos.tb_cliente.nm_cliente}</p>
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
      </div>
       ))
       )}
    </>
  );
};
