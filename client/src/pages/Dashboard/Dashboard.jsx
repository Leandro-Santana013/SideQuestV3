import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SidebarProfissional,
  Header,
  MenuBottomProfissional,
  SidebarCliente,
  MenuBottomCliente,
} from "../../components";
import {
  RiArrowLeftLine,
  RiListUnordered,
  RiQuestionLine,
  RiAttachment2,
} from "react-icons/ri";
import iconeperfil from "../../assets/icone-perfil.png";
import { FaPlus } from "react-icons/fa";
import { ChatContext } from "../../context/ChatContext";
import {
  postRequest,
  favRequest,
  putRequest,
  getRequest,
} from "../../utils/services";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiStarFill } from "react-icons/ri";
import { UserContext } from "../../context/UserContext";
import './dashboard.css'
import LupaIcon from '../../assets/lupa.png'
import avaliarIcon from '../../assets/revisao-do-cliente.png'
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import PropostasChart from "../../components/PropostasChart/PropostasChart";
const Dashboard = () => {
  const { createChat } = useContext(ChatContext);
  const [modal, setModal] = useState(false)
  const {
    profissional,
    imagens,
    comentario,
    saveimg,
    setImagesInstance,
    imagemSelecionada,
    setImagemSelecionada,
  } = useContext(ProfessionalContext);
  useEffect(()=> {
    console.log(comentario, "apapo")
  }, [comentario])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagemSelecionada(reader.result);
      setImagesInstance((param) => ({
        ...param,
        img_galeria: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { Servicehistorico, user } = useContext(UserContext);
  const {pro, ServicosHistory} = useContext(ProfessionalContext);

  console.log(profissional, "profissional");

  return (
    <>
      <Header />
      <SidebarProfissional />
      <MenuBottomProfissional />
      <section className="content-midia">
        <div className="main-content">
          {profissional && (
            <>
           
            <div className="dash-container" >
            {modal &&(
              <div className="fade">
              <div className="modal" style={{width: '30vw', height: '25vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '10px'}}>  {imagemSelecionada && (             
                  <div>
                    <h2>Imagem Selecionada:</h2>
                    <img
                      src={imagemSelecionada}
                      alt="Imagem Selecionada"
                      style={{width: '20vw', height: '15vw'}}
                    />
                    <div style={{display: 'flex', gap: '1vw'}}>
                    <button
                      onClick={() => {
                        saveimg();
                        setModal(false)
                      }}
                      className="submit-button-card"
                    >
                      salvar
                    </button>
                    <button
                      onClick={() => {
                        setImagemSelecionada(null);
                        setModal(false)
                      }}
                      style={{padding: '10px', border: ' 1px solid red', color: 'red', backgroundColor: 'white', cursor: 'pointer'}}
                    >
                      cancelar
                    </button>
                  </div>
                  </div>  
              )}</div></div>
          )}
              <div className="dash-header">
              <div class="dash-card card-dash-1">
        <div class="content">
            <div class="title">Vizualizações no perfil</div>
            <div class="value">340/Mês</div>
            <div class="subtext">↑30 neste mês</div>
        </div>
        <div class="background-icon"><img src={LupaIcon}></img></div>
    </div>
    <div class="dash-card card-dash-2">
        <div class="content">
            <div class="title">Serviços</div>
            <div class="value">12/Mês</div>
            <div class="subtext">10↑</div>
        </div>
        <div class="background-icon">👥</div>
    </div>
    <div class="dash-card card-dash-3">
        <div class="content">
            <div class="title">Avaliações</div>
            <div class="value">4.5 / 400</div>
            <div class="subtext">0.9 ↑ 20 ↑</div>
        </div>
        <div class="background-icon"><img src={avaliarIcon}></img></div>
    </div>
              </div>
              <div className="row-section">
                <div className="dash-section  gallery-section gallery-section-pro" style={{position: 'relative'}}>
                  <div className="section-header">
            <RevenueChart/>
            </div>
                  <div className="section-content">
                  </div>
                </div>
                <div class="dash-section"  style={{color: 'tr'}}>
                <div class="section-header">
                </div>
                <PropostasChart/>
            </div>
              </div>
            </div>
          </>)}

        </div>
      
      </section>
    </>
  );
};
export default Dashboard;
