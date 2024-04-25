import { useContext } from "react"
import { Header, SidebarCliente } from "../../components"
import "./config.css"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

const Config = () => {
  const {user, logoutUser} = useContext(UserContext)
  return (
    <>
    {user && (
      <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link>
    )}
    </>
  );
};

export default Config;
