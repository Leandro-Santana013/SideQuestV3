import React, { useState, useEffect, useContext } from "react";
import {  Header, TextInput, MenuBottomCliente, SidebarProfissional, MenuBottomProfissional } from "../../components";
import { ProfessionalContext} from "../../context/ProfissionalContext";
import { Link,  useNavigate  } from 'react-router-dom';
import ImgPerfil from "../../assets/icone-perfil.png";
import imgSucesso from "../../assets/sucesso1.png";
import { getRequest } from '../../utils/services';
const servicoPrivado = () => {
    const { pro, Dadosprivate } = useContext(ProfessionalContext)
 
  return (
    <>
    <Header />
    <SidebarProfissional />
    <MenuBottomProfissional />
    <div className="content-midia">
        <div className="main-content">
    {Dadosprivate.length > 0 ? (
        Dadosprivate.map((servico) => (
          <div className="card-servicoProfissa" key={servico.id_postagemServico}>
            <Link to={`/VisualizarServicoProfissa/${servico.id_postagemServico}`}>
              <div className="icon-sucesso">
                <img src={imgSucesso} alt="Ícone de sucesso" />
              </div>
              <div className="desc-servico-usuario">
                <h2>{servico.ds_titulo}</h2>
                <p>{servico.ds_servico}</p>
                <div className="info-usuario">
                  <p>Publicação: 2 Horas atrás</p>
                  <div className="avaliacao">
                    <img
                      style={{ borderRadius: "50%" }}
                      src={servico["tb_cliente.img_cliente"] ? servico["tb_cliente.img_cliente"] : ImgPerfil}
                      alt="Ícone de perfil"
                      id="perfil"
                    />
                    <p>{servico["tb_cliente.nm_cliente"]}</p>
                    <i className="fa-regular fa-star"></i>
                    <p>4.9</p>
                  </div>
                </div>
              </div>
              <div className="btn-distancia">
                <button>Ver mais</button>
                <div className="distancia">
                  <i className="ri-map-pin-2-line"></i>
                  <p>3km</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>Nenhum serviço encontrado.</p>
      )}
      </div>
      </div>
    </>
  )
}

export default servicoPrivado
