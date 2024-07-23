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
import './dashboard.css';
import LupaIcon from '../../assets/lupa.png';
import avaliarIcon from '../../assets/revisao-do-cliente.png';
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import PropostasChart from "../../components/PropostasChart/PropostasChart";

const Dashboard = () => {
  const { createChat } = useContext(ChatContext);
  const [modal, setModal] = useState(false);
  const {
    profissional,
    imagens,
    comentario,
    saveimg,
    setImagesInstance,
    imagemSelecionada,
    setImagemSelecionada,
    ServicosHistory,
  } = useContext(ProfessionalContext);

  useEffect(() => {
    console.log(comentario, "apapo");
  }, [comentario]);

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
              <div className="dash-container">
                {modal && (
                  <div className="fade">
                    <div
                      className="modal"
                      style={{
                        width: "30vw",
                        height: "25vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      {imagemSelecionada && (
                        <div>
                          <h2>Imagem Selecionada:</h2>
                          <img
                            src={imagemSelecionada}
                            alt="Imagem Selecionada"
                            style={{ width: "20vw", height: "15vw" }}
                          />
                          <div style={{ display: "flex", gap: "1vw" }}>
                            <button
                              onClick={() => {
                                saveimg();
                                setModal(false);
                              }}
                              className="submit-button-card"
                            >
                              salvar
                            </button>
                            <button
                              onClick={() => {
                                setImagemSelecionada(null);
                                setModal(false);
                              }}
                              style={{
                                padding: "10px",
                                border: " 1px solid red",
                                color: "red",
                                backgroundColor: "white",
                                cursor: "pointer",
                              }}
                            >
                              cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="dash-header">
                  <div className="dash-card card-dash-1">
                    <div className="content">
                      <div className="title">Vizualizações no perfil</div>
                      <div className="value">340/Mês</div>
                      <div className="subtext">↑30 neste mês</div>
                    </div>
                    <div className="background-icon">
                      <img src={LupaIcon} alt="Ícone de Lupa" />
                    </div>
                  </div>
                  <div className="dash-card card-dash-2">
                    <div className="content">
                      <div className="title">Serviços</div>
                      <div className="value">12/Mês</div>
                      <div className="subtext">10↑</div>
                    </div>
                    <div className="background-icon">👥</div>
                  </div>
                  <div className="dash-card card-dash-3">
                    <div className="content">
                      <div className="title">Avaliações</div>
                      <div className="value">4.5 / 400</div>
                      <div className="subtext">0.9 ↑ 20 ↑</div>
                    </div>
                    <div className="background-icon">
                      <img src={avaliarIcon} alt="Ícone de Avaliações" />
                    </div>
                  </div>
                </div>
                <div className="row-section">
                  <div className="dash-section" style={{ position: 'relative' }}>
                    <div className="section-contentchart-line-section">
                      <RevenueChart />
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                  <div className="dash-section chart-pie-section">
                    <div className="section-header" style={{display: 'flex', justifyContent: 'center'}}><h3>Propostas recebidas</h3></div>
                    <PropostasChart />
                  </div>
                    
                </div>
                </div>
               
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                  <h1>Histórico de serviços</h1>
                  </div>
                    {ServicosHistory.length > 0 ? (
                      ServicosHistory.map((historico, index) => (
                        <div className="card-historico" key={index}>
                          <div className="coluna">
                            <div className="info-prof">
                              <p className="desc-tipo-servico">
                                {historico.ds_servico}
                              </p>
                              <p className="desc-nome-prof">
                                cliente: {historico.nm_cliente}
                              </p>
                            </div>
                          </div>
                          <div className="coluna">
                            <p>{historico.dt_inicioServico}</p>
                          </div>
                          <div className="coluna">
                            <p>{historico.dt_terminoServico}</p>
                          </div>
                          <div className="coluna">
                            <p className="categoria">{historico.categoria}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="mensagem-vazia">Nenhum histórico encontrado.</p>
                    )}
                    </div> 
          
              
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
