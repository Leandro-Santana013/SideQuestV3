import React, { useEffect, useState } from "react";
import "./cardProfissional.css";
import imgPerfil from "../../assets/icone-perfil.png";
import imgMedalha10K from "../../assets/medalha10k.png";
import imgMedalhaOuro from "../../assets/medalhaouro.png";
import imgMedalhaBronze from "../../assets/medelhabronze.png";
import imgCertificado from "../../assets/certificado.png";
import { TextInputBusca } from "../index";
import axios from 'axios';

import { RiFilter2Fill, RiStarFill } from "react-icons/ri";

export const CardProfissional = () => {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [modal, setModal] = useState(false);
  let paragrafo = document.querySelector(".desc");
  let botaoVerMais = document.querySelector(".vma-vme");

  const openModal = () => {
    setModal(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModal(false);
  };
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/profissionaisCard"
      );
      setDadosIniciais(response.data);
      setDadosFiltrados(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do backend:", error);
      // Tratamento de erro adicional conforme necessário
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const handleFilter = (filtro) => {
    const dadosFiltrados = dadosIniciais.filter((item) => {
      // Lógica do filtro - exemplo simples: filtrar por nome
      return item.nome.includes(filtro); // Modifique conforme necessário para o seu caso
    });
    setDadosFiltrados(dadosFiltrados);
  };

  function verMaisEMenos() {
    if (paragrafo.classList.contains("expandido")) {
      paragrafo.classList.remove("expandido");
      botaoVerMais.textContent = "ver mais";
    } else {
      paragrafo.classList.add("expandido");
      botaoVerMais.textContent = "ver menos";
    }
  }

  return (
    <section className="area-servicos">
      <div className="input-filtros">
        <TextInputBusca placeholder={"Encontre profissionais"} />
        <div className="ifopenf">
          <div className="filtros" onClick={openModal}>
            <p>Filtros</p>
            <RiFilter2Fill className="iconFilter" />
          </div>
          {modal && (
           <div className="modal">
           <div className="modal-content">
             <span>Filtre por:</span>
             <div className="container-card-filtros">
               <div className="card-filtro">
                 <p>alguma coisa</p>
               </div>
               <div className="card-filtro">
                 <p>alguma coisa</p>
               </div>
             </div>
             <button onClick={closeModal}>Fechar</button>
           </div>
         </div>
          )}
        </div>
      </div>
      {dadosIniciais.length === 0 ? (
        <div className="sem-profissionais">
          <p>Sem profissionais cadastrados.</p>
        </div>
      ) : (
        dadosIniciais.map((profissional) => (
            <div className="card-profissional" key={profissional.id_profissional}>
              <div className="tamplate-img">
                <img src={imgPerfil} alt="Imagem de perfil" />
              </div>
              <div className="desc-cliente">
                <div className="perfil-avaliado">
                  <h2>{profissional.nm_profissional}</h2>
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <RiStarFill
                        key={index}
                        className={`ri-star-s-fill ${
                          index < profissional.media_avaliacoes ? "ava" : ""
                        }`}
                      ></RiStarFill>
                    ))}
                  </div>
                </div>
                <div className="emblemas">
                  <img src={imgMedalha10K} alt="Medalha 10k" />
                  <img src={imgMedalhaOuro} alt="Medalha de Ouro" />
                  <img src={imgMedalhaBronze} alt="Medalha de Bronze" />
                </div>
                <div className="content-desc">
                  <p className="desc">{profissional.ds_biografia ? profissional.ds_biografia : "Não possui descrição"}</p>
                  <span className="vma-vme">ver mais</span>
                </div>
              </div>
              <div className="contrate">
                <button className="btn-contratar">Contratar</button>
                <div className="serv-realizados">
                  <img src={imgCertificado} alt="certificado" />
                  <p>
                    Serviços realizados: {profissional.num_servicos_terminados}
                  </p>
                </div>
              </div>
            </div>
        ))
      )}
    </section>
  );
};
