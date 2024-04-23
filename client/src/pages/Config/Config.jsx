import { useContext } from "react"
import { Header, SidebarCliente } from "../../components"
import "./config.css"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

import imgPerfil from '../../assets/icone-perfil.png'

const Config = () => {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="header-conteudo-config-perfil">
              <img src={imgPerfil} alt="Imagem de perfil" className="img-config-perfil" />
              <button className="btn-config-editar-perfil">Editar</button>
            </div>
            <div className="card-info-config-perfil">
              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <p>Nome</p>
                  <p>Vitorino</p>
                </div>
                <button className="btn-config-editar-perfil">Editar</button>
              </div>

              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <p>Email</p>
                  <p>vitorino@outlook.com</p>
                </div>
                <button className="btn-config-editar-perfil">Editar</button>
              </div>

              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <p>Número</p>
                  <p>99199-9999</p>
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