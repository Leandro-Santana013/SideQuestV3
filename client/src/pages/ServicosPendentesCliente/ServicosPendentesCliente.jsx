import React from "react";
import "./servicosPendentesCliente.css";
import { SidebarCliente, Header } from "../../components";
import imgSucesso from "../../assets/sucesso1.png";

const ServicosPendentesCliente = () => {
    return (
        <>
        <Header />
        <SidebarCliente />
  <div className="content-midia">
    <div className="sessao-cards">
      <h1>Serviços Pendentes</h1>
      <div className="card-servicoProfissa">
        <div className="icon-sucesso">
          <img src="../img/sucesso1.png" alt="Ícone de sucesso" />
        </div>
        <div className="desc-servico-usuario">
          <h2>Pintura de Parede 4m²</h2>
          <p>
            A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura. Ela é atualmente de um tom neutro, mas quero transformá-la em um ponto de destaque na sala...
            <strong>Ver mais detalhes</strong>
          </p>
        </div>
        <div className="double-button">
          <button id="valor">R$450</button>
          <a href="/visualizarServicoCliente"><button id="ver-mais">Ver mais</button></a>
        </div>
      </div>

      <div className="card-servicoProfissa">
        <div className="icon-sucesso">
          <img src="../img/sucesso1.png" alt="Ícone de sucesso" />
        </div>
        <div className="desc-servico-usuario">
          <h2>Pintura de Parede 4m²</h2>
          <p>
            A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura. Ela é atualmente de um tom neutro, mas quero transformá-la em um ponto de destaque na sala...
            <strong>Ver mais detalhes</strong>
          </p>
        </div>
        <div className="double-button">
          <button id="valor">R$450</button>
          <a href="/visualizarServicoCliente"><button id="ver-mais">Ver mais</button></a>
        </div>
      </div>

      <div className="card-servicoProfissa">
        <div className="icon-sucesso">
          <img src="../img/sucesso1.png" alt="Ícone de sucesso" />
        </div>
        <div className="desc-servico-usuario">
          <h2>Pintura de Parede 4m²</h2>
          <p>
            A parede em questão tem aproximadamente 4 metros de largura e 2,7 metros de altura. Ela é atualmente de um tom neutro, mas quero transformá-la em um ponto de destaque na sala...
            <strong>Ver mais detalhes</strong>
          </p>
        </div>
        <div className="double-button">
          <button id="valor">R$450</button>
          <a href="/visualizarServicoCliente"><button id="ver-mais">Ver mais</button></a>
        </div>
      </div>

      
    </div>
  </div>
  </>
    );
};

export default ServicosPendentesCliente;