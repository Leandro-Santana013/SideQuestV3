// Path: src/components/CardServico/CardServico.js

import React, { useEffect, useContext, useState } from "react";
import "./cardServico.css";
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import { TextInputBusca } from "../index";
import { RiFilter2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import JSZip from "jszip";
import base64js from "base64-js";

export const CardServico = () => {
  const { Dadosiniciais, setDadosIniciais } = useContext(ProfessionalContext);
  const [servico, setServicos] = useState(Dadosiniciais)
  useEffect(() => {
    if (Array.isArray(Dadosiniciais)) {
      const unzipData = async () => {
        const unzippedData = await Promise.all(
          Dadosiniciais.map(async (item) => {
            if (item.img_servico) {
              try {
                const imgServicoObj = JSON.parse(item.img_servico);
                if (imgServicoObj.content) {
                  const zip = new JSZip();
                  const arrayBuffer = base64js.toByteArray(imgServicoObj.content).buffer;
                  const unzipped = await zip.loadAsync(arrayBuffer);
                  const files = {};
                  for (let filename in unzipped.files) {
                    const fileData = await unzipped.files[filename].async("base64");
                    files[filename] = `data:image/png;base64,${fileData}`;  // Assumindo que a imagem é png
                  }
                  return { ...item, img_servico: files[Object.keys(files)[0]] }; // Pega a primeira imagem descompactada
                } else {
                  console.error("content property not found in img_servico");
                  return item;
                }
              } catch (error) {
                console.error("Error parsing or unzipping img_servico:", error);
                return item;
              }
            }
            return item;
          })
        );
        setServicos(unzippedData);
      };

      unzipData();
    }
  }, [Dadosiniciais]);

  const servicos = Array.isArray(servico) ? servico : [];

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
          <div className="card" key={servico.id_postagemServico}>
            <div className="card-header">
              <img src={servico.img_servico ? servico.img_servico : imgSucesso} alt="Imagem do serviço" />
            </div>
            <div className="card-body">
              <h2>{servico.ds_titulo}</h2>
              <p>
                A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura.
                Ela... <a href="#">Ver mais detalhes</a>
              </p>
            </div>
            <div className="card-footer">
              <div className="user-info">
                <img src={servico["tb_cliente.img_cliente"] ? servico["tb_cliente.img_cliente"] : ImgPerfil} alt="Avatar do Usuário" className="avatar" />
                <span>{servico["tb_cliente.nm_cliente"]}</span>
              </div>
              <button className="btn">Ver Mais</button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum serviço encontrado.</p>
      )}
    </>
  );
};
