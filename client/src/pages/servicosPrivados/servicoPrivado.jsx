import React, { useState, useEffect, useContext } from "react";
import {  Header, TextInput, MenuBottomCliente, SidebarProfissional, MenuBottomProfissional } from "../../components";
import { ProfessionalContext} from "../../context/ProfissionalContext";
import { Link,  useNavigate  } from 'react-router-dom';
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import { getRequest } from '../../utils/services';
import JSZip from "jszip";
import base64js from "base64-js";
const servicoPrivado = () => {
    const { pro, Dadosprivate } = useContext(ProfessionalContext)
    const [modal, setModal] = useState(false)
    const [servico, setServicos] = useState(Dadosprivate);


    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...' + ' Ver mais';
      }
      return text;
    };
    
    useEffect(() => {
      if (Array.isArray(Dadosprivate)) {
        const unzipData = async () => {
          const unzippedData = await Promise.all(
            Dadosprivate.map(async (item) => {
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
    }, [Dadosprivate]);

  return (
    <>
    <Header />
    <SidebarProfissional />
    <MenuBottomProfissional />
    <div className="content-midia">
    <div className="main-content">
        <h1>Serviços recebidos</h1>
      <div className="cards-servicos">
        {servico?.length > 0 ? (
          servico.map((servico) => (
            <div className="card-servico-profissional" key={servico.id_postagemServico}>        
             <Link to={`/VisualizarServicoProfissa/${servico.id_postagemServico}`}>
                <div className="card-servico-profissional-header">
                  {servico.img_servico ? <img src={servico.img_servico} alt="Imagem do serviço" /> : ''}
                </div>
                <div className="card-servico-profissional-body">
                  <h2>{servico.ds_titulo}</h2>
                  <p>
                    {truncateText(servico.ds_servico, 66)}
                  </p>              
                </div>
                <div className="card-servico-profissional-footer">
                <button id="finalizar" className='submit-button-card'>Aceitar</button>
                </div>
                </Link>   
            </div>
          ))
        ) : (
          <p>Nenhum serviço encontrado.</p>
        )}
      </div>
      </div>
      </div>
    </>
  )
}

export default servicoPrivado
