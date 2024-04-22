import { useContext } from "react"
import { Header, SidebarCliente } from "../../components"
import "./config.css"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

const Config = () => {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="conteudo-config-perfil">
          <div className="main-content">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Config;

{/* <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link> */}