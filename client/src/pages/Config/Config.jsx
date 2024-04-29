import { useContext, useRef, useState } from "react"
import { Header, SidebarCliente, ImageCropper } from "../../components"
import "./config.css"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

import imgPerfil from '../../assets/icone-perfil.png'

const Config = () => {
const avatarUrl = useRef(imgPerfil)
  const updatefoto = (ImgSrc) => {
    avatarUrl.current.src = ImgSrc; // Atualizando a imagem de perfil
  };

  const { user, logoutUser } = useContext(UserContext)
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="header-conteudo-config-perfil">
              <img ref={avatarUrl} src={imgPerfil} alt="Imagem de perfil" className="img-config-perfil" style={{ border: "1px groove black",
                objectFit: "contain",
                width: "120px",
                height: "120px",
                borderRadius: "50%"}}/>
              <ImageCropper updatefoto={updatefoto} />
            </div>
            <div className="card-info-config-perfil">
              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <h4>Nome</h4>
                  <p>{user.name ? user.name : ""}</p>
                </div>
                <button className="btn-config-editar-perfil">Editar</button>
              </div>

              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <h4>Email</h4>
                  <p>{user.email ? user.email : ""}</p>
                </div>
                <button className="btn-config-editar-perfil">Editar</button>
              </div>

              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <h4>Número</h4>
                  <p>{user.numero ? user.numero : <><div className="buttonAddNumber"><button>adicionar numero</button></div></>}</p>
                </div>
                <button className="btn-config-editar-perfil">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Config;

{/* <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link> */ }