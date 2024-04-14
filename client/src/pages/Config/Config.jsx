import { useContext } from "react"
import { Header, SidebarCliente } from "../../components"
import "./config.css"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

const Config = () => {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <>
    {user && (
      <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link>
    )}
    </>
  );
};

export default Config;
