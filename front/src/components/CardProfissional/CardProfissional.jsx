import React, { useEffect, useState } from "react";
import "./cardProfissional.css";
import imgPerfil from "../../assets/icone-perfil.png";
import imgMedalha10K from "../../assets/medalha10k.png";
import imgMedalhaOuro from "../../assets/medalhaouro.png";
import imgMedalhaBronze from "../../assets/medelhabronze.png";
import imgCertificado from "../../assets/certificado.png";

export const CardProfissional = () => {
  let paragrafo = document.querySelector(".desc");
  let botaoVerMais = document.querySelector(".vma-vme");

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
      <div className="card-servico">
        <div className="tamplate-img">
          <img src={imgPerfil} alt="Imagem de perfil" />
        </div>
        <div className="desc-cliente">
          <div className="perfil-avaliado">
            <h2>Default</h2>
            <div className="stars">
              <i className="ri-star-s-fill ava"></i>
              <i className="ri-star-s-fill ava"></i>
              <i className="ri-star-s-fill ava"></i>
              <i className="ri-star-s-fill ava"></i>
              <i className="ri-star-s-fill"></i>
            </div>
          </div>
          <div className="emblemas">
            <img src={imgMedalha10K} alt="Medalha 10k" />
            <img src={imgMedalhaOuro} alt="Medalha de Ouro" />
            <img src={imgMedalhaBronze} alt="Medalha de Bronze" />
          </div>
          <div className="content-desc">
            <p className="desc" id="maix">
              Eu sou um eletricista formado pela FATEC e tenho 5 anos de
              experiência em instalações elétricas e manutenção. Sou
              especializado em reparos elétricos residenciais e comerciais,
              incluindo a instalação de novos sistemas elétricos, reparos de
              fiação e iluminação.
            </p>
            <span className="vma-vme" onClick={verMaisEMenos}>
              ver mais
            </span>
          </div>
        </div>
        <div className="contrate">
          <button className="btn-contratar">Contratar</button>
          <div className="serv-realizados">
            <img src={imgCertificado} alt="certificado" />
            <p>Serviços realizados: 964984</p>
          </div>
        </div>
      </div>
    </section>
  );
};
