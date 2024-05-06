import React from "react";
import "./perfilProfissional.css";
import { SidebarProfissional, Header, } from "../../components";
import iconeperfil from "../../assets/icone-perfil.png";
import medalhaouro from "../../assets/medalhaouro.png"
import medalha10k from "../../assets/medalha10k.png";
import medalhabronze from "../../assets/medalha10k.png";
import estrelas from "../../assets/estrelinha.png";
import agenda from "../../assets/agenda.png";
import certificado from "../../assets/certificado.png";

const PerfilProfissional = () => {
    return (
        <>
            <Header />
            <SidebarProfissional />
            <section className="content-midia">
                <div className="main-content">
                    <div className="perfil-profissional">
                        <div className="cabecalho-perfil">
                            <div className="perfil-nome">
                                <img src={iconeperfil} alt="icone de perfil" />
                                <div className="nome-profissao">
                                    <h1>Caio Bezerra</h1>
                                    <h2>Eletricista</h2>
                                </div>
                            </div>
                            <div className="menu-perfil">
                                <ul>
                                    <li>Sobre</li>
                                    <li>Mídia(4)</li>
                                    <li>Avaliações</li>
                                </ul>
                            </div>
                            <hr />
                        </div>
                        <div className="descricao-profissional">
                            <div className="avaliacao">
                                {/* <button>Editar</button> */}
                                <div className="num-avaliacao">
                                    <p>5.00</p>
                                    <div className="estrela">
                                        <img src={estrelas} alt="estrelas" />
                                        <p>210 avaliações</p>
                                    </div>
                                </div>
                                <div className="medalhas">
                                    <img src={medalha10k} alt="medalha 10" />
                                    <img src={medalhaouro} alt="medalha de ouro" />
                                    <img src={medalhabronze} alt="medalha de bronze" />
                                </div>
                            </div>
                            <div className="info-pessoais">
                                <div className="sobremim">
                                    <h2>Sobre mim</h2>
                                    <p>Eu sou um eletricista formado pela FATEC e tenho 5 anos de experiência em instalações elétricas e manutenção. Sou especializado em reparos elétricos residenciais e comerciais, incluindo a instalação de novos sistemas elétricos, reparos de fiação, iluminação e muito mais. Tenho conhecimento em tecnologia e inovação e estou sempre atualizado com as últimas tendências do setor. Sou capaz de trabalhar bem em equipe e tenho excelentes habilidades de comunicação.</p>
                                </div>
                                <div className="registro-servicos">
                                    <div className="registro">
                                        <img src={agenda} alt="agenda" />
                                        <p>Registro em: Out/23</p>
                                    </div>
                                    <div className="servicos">
                                        <img src={certificado} alt="certificado" />
                                        <p>Serviços Realizados: 210</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default PerfilProfissional;