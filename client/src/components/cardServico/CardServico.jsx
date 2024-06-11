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
  console.log(Dadosiniciais, "inicial")
  const [servico, setServicos] = useState(Dadosiniciais);

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

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...' + ' Ver mais';
    }
    return text;
  };

  const servicos = Array.isArray(servico) ? servico : [];
  console.log(servicos, "servicos");

  return (
    <>
      <div className="input-filtros" style={{justifyContent: 'center'}}>
        <TextInputBusca placeholder={"Pesquisar por serviços"} />
        {/* <div className="filtros">
          <p>Filtros</p>
          <RiFilter2Fill className="iconFilter" />
        </div> */}
      </div>
      <div className="cards-container">

        {servicos.length > 0 ? (
          servicos.map((servico) => (
            <div className="card-servico-profissional" key={servico.id_postagemServico}>
              <Link to={`/VisualizarServicoProfissa/${servico.id_postagemServico}`}>
                <div className="card-servico-profissional-header">
                <p className="card-time">{servico.diferencaTempo}</p>
                  {servico.img_servico ? <img src={servico.img_servico} alt="Imagem do serviço" /> : ''}
                </div>
                <div className="card-servico-profissional-body">
                  <h2>{servico.ds_titulo}</h2>
                  <p>
                    {truncateText(servico.ds_servico, 66)}
                  </p>
                  <div className="user-info">
                    <div className="user">
                    <img src={servico["tb_cliente.img_cliente"] ? servico["tb_cliente.img_cliente"] : ImgPerfil} alt="Avatar do Usuário" className="avatar" />
                    <span>{servico["tb_cliente.nm_cliente"]}</span>
                    </div>
                  </div>
                </div>
                <div className="card-servico-profissional-footer">
                  <button className="btn">Ver Mais</button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>Nenhum serviço encontrado.</p>
        )}
      </div>
    </>
  );
};
