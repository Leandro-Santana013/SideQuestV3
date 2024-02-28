import React from "react";
import "./homeCliente.css";
import { SidebarCliente, CardProfissional, Header } from "../../components";
import imgAproved from "../../assets/aproved.png";
import imgReload from "../../assets/reload.png";
import imgCalendario from "../../assets/calendario1.png";

const HomeCliente = () => {
  return (
    <>
      <Header />
      <SidebarCliente />

      <div className="content-midia">
        <div className="menu-profissionais">
          <div className="menu-topo">
            <div className="actions">
              <div className="info-action">
                <p>Adicionar serviço</p>
                <div className="action">
                  <p>Publique um serviço e receba orçamentos</p>
                  <img src={imgAproved} alt="" />
                </div>
              </div>
            </div>

            <div className="actions">
              <div className="info-action">
                <p>Serviços Ativos</p>
                <div className="action">
                  <p>Você possui 3 serviços ativos</p>
                  <img src={imgReload} alt="" />
                </div>
              </div>
            </div>

            <div className="actions">
              <div className="info-action">
                <p>Serviços Pendentes</p>
                <div className="action">
                  <p>Vizualize os serviços pendentes</p>
                  <img src={imgCalendario} alt="" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="h1HomeCliente">Encontre os melhores profissionais para seu problema</h1>

          <div className="input-filtros">
            <div className="content-inputs">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="busque por serviços" className="inputHome" />
            </div>
            <div className="filtros">
              <p>Filtros</p>
              <i className="fa-solid fa-sliders"></i>
            </div>
          </div>

          <CardProfissional />
        </div>
      </div>
    </>
  );
};

export default HomeCliente;
