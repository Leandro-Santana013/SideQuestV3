import { useContext, useRef, useState } from "react"
import { Header, SidebarCliente, ImageCropper } from "../../components"
import "./config.css"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

import imgPerfil from '../../assets/icone-perfil.png'

const Config = () => {
const avatarUrl = useRef(imgPerfil)
const { user, logoutUser, setChangedUserData, changedUserData, functionUpdateInfoUser } = useContext(UserContext)
const [showModal, setShowModal] = useState(false);

const updateUserData = (newData) => {
  const changes = {};
  changes.id_cliente = user.id_cliente;
  if (newData.name !== user.name) {
    changes.name = newData.name;
  }
  if (newData.email !== user.email) {
    changes.email = newData.email;
  }
  if (newData.numero !== user.numero) {
    changes.numero = newData.numero;
  }
  if (newData.foto !== imgPerfil && newData.foto !== user.foto) {
    changes.foto = newData.foto;
  }
  setChangedUserData(changes);
  if (Object.keys(changes).length > 0) {
    setShowModal(true); // Mostra o modal se houver alterações
  }
  setChangedUserData(changes);
};


  const updatefoto = (ImgSrc) => {
    avatarUrl.current.src = ImgSrc; // Atualizando a imagem de perfil
    updateUserData({ ...changedUserData, foto: ImgSrc });
  };


  const deleteUpdate = () =>{
    avatarUrl.current.src = null
    setChangedUserData(null);
  }
  
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <div className="conteudo-config-perfil">
            <div className="header-conteudo-config-perfil">
              <img id="img" htmlFor="comp" ref={avatarUrl} src={imgPerfil} alt="Imagem de perfil" className="img-config-perfil" style={{ border: "1px groove black",
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Seu perfil foi alterado. Deseja salvar as alterações?</p>
            <button onClick={deleteUpdate} >Cancelar</button>
            <button onClick={functionUpdateInfoUser}>Salvar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Config;

{/* <Link className="btn-logout" to="/Login" onClick={() => logoutUser()}>LOGOUT</Link> */ }