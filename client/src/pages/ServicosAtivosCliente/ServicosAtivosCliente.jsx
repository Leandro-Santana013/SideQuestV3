import React, { useContext, useEffect, useState } from "react";
import "./servicosAtivosCliente.css";
import { SidebarCliente, Header } from "../../components";
import ImgPerfil from "../../assets/icone-perfil.png";
import { UserContext } from "../../context/UserContext";
import StarRating from "../../components/StarRating/StarRating"; // Import the StarRating component
import { Link } from "react-router-dom";

const ServicosAtivosCliente = () => {
  const { ServiceEnd,  setAvaliacao, avaliar } = useContext(UserContext);
  const [servico, setServicos] = useState(ServiceEnd);
  const [modal, setModal] = useState(false)

const [selectedService, setSelectedService] = useState(null);
  const [rating, setRating] = useState(0);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...' + ' Ver mais';
    }
    return text;
  };


  useEffect(() => {
    if (Array.isArray(ServiceEnd)) {
      const unzipData = async () => {
        const unzippedData = await Promise.all(
          ServiceEnd.map(async (item) => {
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
  }, [ServiceEnd]);


  const handleRatingSubmit = (rating) => {
    setAvaliacao((prevAvaliacao) => ({
      ...prevAvaliacao,
      nmr_avaliacao: rating,
    }));
  };
  useEffect(()=> {
    setAvaliacao((prevAvaliacao) => ({
      ...prevAvaliacao,
      id_confirmacaoServico: selectedService?.id_confirmacaoServico,
    }));
  }, [selectedService])

  const handleFieldChange = (field, event) => {
    const value = event.target.value;
    setAvaliacao((prevAvaliacao) => ({
      ...prevAvaliacao,
      [field]: value
    }));
  };



  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <h1>Serviços ativos</h1>
          <div className="cards-servicos">
            {modal && (
              <div className="fade">
                <div className="modal-avaliar">
                  <button className="close-modal-avaliar" onClick={() => setModal(false)}>X</button>
                  <h3>Serviço Finalizado</h3>
                  <p>Não se esqueça de avaliar o profissional!</p>
                  <StarRating onRatingSubmit={handleRatingSubmit} />
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <textarea placeholder="Deixe seu comentário" 
                  onChange={(event) =>
                    handleFieldChange("ds_comentario", event)
                  }
                  className="comentario-textarea"
                  />
                  <button onClick={async()=>{
                 await avaliar()
                 setModal(false); 
                    window.location.reload()
                  }} className="submit-button-avaliar">Enviar</button>
                  </div>
                </div>
              </div>
            )}
            {ServiceEnd?.length > 0 ? (
              ServiceEnd.map((servico) => (
                <div className="card-servico-profissional" key={servico.id_postagemServico}>
                  <div className="card-servico-profissional-header">
                    {servico.img_servico ? <img src={servico.img_servico} alt="Imagem do serviço" /> : ''}
                  </div>
                  <div className="card-servico-profissional-body">
                    <h2>{servico.ds_titulo}</h2>
                    <p>{truncateText(servico.ds_servico, 66)}</p>
                  </div>
                  <div className="card-servico-profissional-footer">
                    {servico.set_finalizar && (
                      <button id="finalizar" className='submit-button-card' onClick={() => {
                        setSelectedService(servico);
                        setModal(true)
                      }}>
                        Finalizar
                      </button>
                    )}
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

export default ServicosAtivosCliente;
