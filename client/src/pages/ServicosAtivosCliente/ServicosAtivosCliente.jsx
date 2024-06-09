import React, { useContext, useEffect, useState } from "react";
import "./servicosAtivosCliente.css";
import { SidebarCliente, Header } from "../../components";
import sucessoIcon from "../../assets/sucesso1.png";
import iconeperfil from "../../assets/icone-perfil.png";
import alertaIcon from "../../assets/alerta.png";
import { UserContext } from "../../context/UserContext";

const ServicosAtivosCliente = () => {
  const { ServiceEnd } = useContext(UserContext);
  console.log(ServiceEnd, "bbbb");
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="sessao-cards">
          <h1>Serviços Ativos</h1>
          {ServiceEnd?.length > 0 ? (
            ServiceEnd.map((serv) => (
              <div className="card-servicoProfissa">
                <div className="icon-sucesso">
                  <img src={sucessoIcon} alt="icone de sucesso" />
                </div>
                <div className="desc-servico-usuario">
                  <h2>{serv.ds_titulo}</h2>
                  <p>{serv.ds_servico}
                    <strong>Ver mais detalhes</strong>
                  </p>
                  <div className="info-usuario">
                    <p>Início: 02/10/2023 Fim: 27/10/2023</p>
                    <div className="avaliacao">
                      <img src={iconeperfil} alt="icone perfil" id="perfil" />
                      <p>João Silva</p>
                      <i className="fa-regular fa-star"></i>
                      <p>4.9</p>
                    </div>
                  </div>
                  <div className="chat-cancelar">
                  {serv.set_finalizar &&  <button id="finalizar">Finalizar</button>}
                    <button id="chat">Chat</button>
                    <button id="cancelar">Cancelar</button>
                  </div>
                </div>
                <div className="btn-distancia">
                  <button>R$450</button>
                </div>
              </div>
            ))
          ) : (
            <>
              <p>Nenhum serviço encontrado.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicosAtivosCliente;
