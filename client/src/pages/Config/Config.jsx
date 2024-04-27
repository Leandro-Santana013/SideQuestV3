import { useContext } from "react"
import { Header, SidebarCliente } from "../../components"
import "./config.css"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

import imgPerfil from '../../assets/icone-perfil.png'

const Config = () => {
  const { user, logoutUser } = useContext(UserContext)
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="header-conteudo-config-perfil">
              <img src={imgPerfil} alt="Imagem de perfil" className="img-config-perfil" />

            </div>
            <div className="card-info-config-perfil">
              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <h4>Nome</h4>
                  <p>{user.name}</p>
                </div>
                <button className="btn-config-editar-perfil">Editar</button>
              </div>

              <div className="line-info-config-perfil">
                <div className="column-info-config-perfil">
                  <h4>Email</h4>
                  <p>{user.email}</p>
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