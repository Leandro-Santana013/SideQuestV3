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
  const { pro, ServicosEnd } = useContext(ProfessionalContext);
  return (
    <>
      <Header />
      <SidebarProfissional />
      <MenuBottomProfissional />
      <div className="content-midia">
        <div className="sessao-cards">
          <h1>Serviços Ativos</h1>
          {ServicosEnd.length > 0 ? (
            ServicosEnd.map((servicos) => (
              <>
                <div
                  className="card-servicoProfissa"
                  key={servicos.id_postagemServico}
                >
                  <div className="icon-sucesso">
                    <img src={sucessoIcon} alt="icone de sucesso" />
                  </div>
                  <div className="desc-servico-usuario">
                    <h2>{servicos.ds_titulo}</h2>
                    <p>{servicos.ds_servico}</p>
                    <div className="info-usuario">
                      <p>Início:{servicos.dt_inicioServico}</p>
                      <div className="avaliacao">
                        <img src={servicos.img_cliente ? servicos.img_cliente : iconeperfil} alt="icone perfil" id="perfil" />
                        <p>{servicos.nm_cliente}</p>
                        <i className="fa-regular fa-star"></i>
                        <p>4.9</p>
                      </div>
                    </div>
                    <div className="chat-cancelar">
                      <button id="chat">Chat</button>
                      <button id="cancelar">Cancelar</button>
                    </div>
                  </div>
                  <div className="btn-distancia">
                    <button>R$450</button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>sem serviços ativos</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ServicosAtivos;
