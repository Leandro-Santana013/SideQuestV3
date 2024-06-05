import React, { useContext, useState } from "react";
import { SidebarProfissional, Header, CardServico, InfoincPro,MenuBottomProfissional } from "../../components";
import "./homeProfissional.css";
import "../../assets/icone-perfil.png";
import imgAproved from "../../assets/aproved.png";
import imgReload from "../../assets/reload.png";
import imgCalendario from "../../assets/calendario1.png";
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import imgTarefaConcluida from "../../assets/tarefa-concluida1.png"
import { Link } from "react-router-dom";
import { ProfessionalContext} from "../../context/ProfissionalContext";
import { RiFilter2Fill } from "react-icons/ri";


const HomeProfissionais = () => {
    const { num } = useContext(ProfessionalContext)
    return (
        <>
            <InfoincPro />
            <Header />
            <SidebarProfissional />
            <MenuBottomProfissional />
            <div className="content-midia">

                <div className="main-content">
                        <div className="menu-topo">
                            <div className="actions">
                                <div className="info-action">
                                    <p>Serviços Concluidos</p>
                                    <div className="action">
                                        <p>Veja os seus serviços já concluidos</p>
                                        <img src={imgTarefaConcluida} alt="Tarefas concluidas" />
                                    </div>
                                </div>
                            </div>
                            <div className="actions">
                                <div className="info-action">
                                    <p>Serviços Ativos</p>
                                    <Link to="/ServicosAtivosProfissa">
                                    <div className="action">
                                        <p>Você possui {num > 0 ? num : "0"} serviços ativos</p>
                                        <img src={imgReload} alt="" />
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="actions">
                                <div className="info-action">
                                    <p>Serviços Agendados</p>
                                    <div className="action">
                                        <p>Visualize os serviços pendentes</p>
                                        <img src={imgCalendario} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="encontre-prof-p-seu-problema">Encontre os melhores profissionais para o seu problema</h1>
                        <section className="area-servicos">
                            <CardServico />
                        </section>
                    </div>
                </div>
        </>
    );
}

export default HomeProfissionais;
