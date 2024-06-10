import React, { useState, useEffect, useContext } from "react";
import {
  SidebarCliente,
  Header,
  SidebarProfissional,
  MenuBottomProfissional,
} from "../../components";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import "./servicosAtivosProfissa.css";
import sucessoIcon from "../../assets/sucesso1.png";
import iconeperfil from "../../assets/icone-perfil.png";
import alertaIcon from "../../assets/alerta.png";

function ServicosAtivos() {
  const { pro, ServicosEnd, submitforCLient } = useContext(ProfessionalContext);
  const [servico, setServicos] = useState(ServicosEnd);
    const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...' + ' Ver mais';
    }
    return text;
  };

  useEffect(() => {
    if (Array.isArray(ServicosEnd)) {
      const unzipData = async () => {
        const unzippedData = await Promise.all(
          ServicosEnd.map(async (item) => {
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
  }, [ServicosEnd]);

  return (
    <>
      <Header />
      <SidebarProfissional />
      <MenuBottomProfissional />
      <div className="content-midia">
        <div className="main-content">
        <h1>Serviços ativos</h1>
      <div className="cards-servicos">
        {ServicosEnd?.length > 0 ? (
          ServicosEnd.map((servico) => (
            <div className="card-servico-profissional" key={servico.id_postagemServico}>           
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
                {servico.set_finalizar ? (<><label id="finalizar">aguardando</label></>) :<button id="finalizar" onClick={async() => {
                  submitforCLient(servico.id_confirmacaoServico);
                  setModal(true)
                }}>Finalizar</button>}
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
}

export default ServicosAtivos;
