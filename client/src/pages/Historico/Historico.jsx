import React, { useContext, useEffect, useState } from "react";
import "./Historico.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import { SidebarCliente, Header, MenuBottomCliente, SidebarProfissional, MenuBottomProfissional } from "../../components";
import { RiSearch2Line } from "react-icons/ri";

function Historico() {
  const { Servicehistorico, user } = useContext(UserContext);
  const {pro, ServicosHistory} = useContext(ProfessionalContext);
useEffect(()=> {
console.log(ServicosHistory, Servicehistorico)
}, [ServicosHistory, Servicehistorico ])
  return (
    <>
      {user && (
        <>
          <Header />
          <SidebarCliente />
          <MenuBottomCliente />
        </>
      )}
      {pro && (<>
        <Header />
        <SidebarProfissional />
        <MenuBottomProfissional />
        </>)}
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-historico ">
            <div className="header-historico">
              <h2>Histórico</h2>
              <div className="input-procurar">
                <input type="text" placeholder="Procurar" />
                <i>
                  <RiSearch2Line />
                </i>
              </div>
            </div>
            <div className="lista-historico">
              <div className="hist-cabecalho">
                <div className="coluna">Serviços</div>
                <div className="coluna">Início</div>
                <div className="coluna">Fim</div>
                <div className="coluna">Categoria</div>
              </div>
              {Servicehistorico?.length > 0 ? (
                Servicehistorico.map((historico, index) => (
                  <div className="card-historico" key={index}>
                    <div className="coluna">
                      <div className="info-prof">
                        <p className="desc-tipo-servico">
                          {historico.ds_servico}
                        </p>
                        <p className="desc-nome-prof">
                          Profissional: {historico.nm_profissional}
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
              ) :  ServicosHistory.length > 0 ? (
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
              ) : (<p className="mensagem-vazia">Nenhum historico encontrado.</p>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Historico;
