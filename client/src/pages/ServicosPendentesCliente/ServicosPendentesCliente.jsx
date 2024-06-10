import React, {useContext, useEffect, useState} from "react";
import "./servicosPendentesCliente.css";
import { SidebarCliente, Header, MenuBottomCliente } from "../../components";
import imgSucesso from "../../assets/sucesso1.png";
import ImgPerfil from "../../assets/icone-perfil.png";
import { UserContext } from "../../context/UserContext";
import JSZip from "jszip";
import base64js from "base64-js";

const ServicosPendentesCliente = () => {
  const { ServicePend } = useContext(UserContext);
  console.log(ServicePend, "inicial")
  const [servico, setServicos] = useState(ServicePend);

  useEffect(() => {
    if (Array.isArray(ServicePend)) {
      const unzipData = async () => {
        const unzippedData = await Promise.all(
          ServicePend.map(async (item) => {
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
  }, [ServicePend]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...' + ' Ver mais';
    }
    return text;
  };

  const servicos = Array.isArray(servico) ? servico : [];

  return (
    <>
        
      <Header />
      <SidebarCliente />
      <MenuBottomCliente />

      <div className="content-midia">
        <div className="main-content">
        <h1>Serviços pendentes</h1>
      <div className="cards-servicos">

        {servicos.length > 0 ? (
          servicos.map((servico) => (
            <div className="card-servico-profissional" key={servico.id_postagemServico}>
           
                <div className="card-servico-profissional-header">
                  {servico.img_servico ? <img src={servico.img_servico} alt="Imagem do serviço" /> : ''}
                </div>
                <div className="card-servico-profissional-body">
                  <h2>{servico.ds_titulo}</h2>
                  <p>
                    {truncateText(servico.ds_servico, 66)}
                  </p>
                  <div className="user-info">
                    <p>{servico.diferencaTempo}</p>
                  </div>
                </div>
                <div className="card-servico-profissional-footer">
                  <button className="btn">Ver Mais</button>
                </div>
            </div>
          ))
        ) : (
          <p>Nenhum serviço encontrado.</p>
        )}
      </div>
      </div>
      </div>
    </>
  );
};


export default ServicosPendentesCliente;