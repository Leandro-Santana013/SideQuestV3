import React from "react";
import "./visualizarServicoCliente.css";
import { SidebarCliente, Header } from "../../components/index";
import bandeira from "../../assets/bandeira.png";
import iconeperfil from "../../assets/icone-perfil.png";
import endereco from "../../assets/endereco.png";
import btnplay from "../../assets/botao-play.png";
import avaliacao from "../../assets/estrelinha.png";
import  editar from "../../assets/editar.png"
const VisualizarServicoCliente = () => {
    return (
        <>
        <Header />
        <SidebarCliente />
        <div className="content-midia">
            <div className="main-content">
                <div className="vizuPedido">
                    <div className="cabecalho-pedido">
                        <h1>Pintura de Parede 4M²</h1>
                        <div className="preco-pedido">
                            <h2>Pintura</h2>
                            <button id="btn-preco">R$400 - R$450</button>
                        </div>
                    </div>
                    <hr id="linha-cabecalho" />
                    <div className="descricao-cliente">
                        <div className="btn-Usuario">
                            <button id="btn-verde">Propostas</button>
                            <button id="btn-verde">Editar <img src={editar} alt="" /></button>
                            <button id="excluir">Excluir</button>
                        </div>
                        <div className="desc-tempo-perdido">
                            <h2>Descrição</h2>
                            <p>Eu sou um eletricista formado pela FATEC e tenho 5 anos de experiência em instalações elétricas e manutenção. Sou especializado em reparos elétricos residenciais e comerciais, incluindo a instalação de novos sistemas elétricos, reparos de fiação, iluminação e muito mais. Tenho conhecimento em tecnologia e inovação e estou sempre atualizado com as últimas tendências do setor. Sou capaz de trabalhar bem em equipe e tenho excelentes habilidades de comunicação.</p>
                            <div className="tempo-pedido">
                                <div className="tempo-inicio">
                                    <img src={btnplay}alt="botão play" />
                                    <p>Início: 14/09/2023</p>
                                </div>
                                <div className="tempo-fim">
                                    <img src={bandeira} alt="bandeira de chegada" />
                                    <p>Fim: 16/09/2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default VisualizarServicoCliente;