import React, { useContext, useEffect, useState } from "react";
import iconPerfil from "../../assets/icone-perfil.png";
import { FaPaintBrush } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { ProfessionalContext } from "../../context/ProfissionalContext";
export const Perfilcli = () => {
  const { user } = useContext(UserContext);
  const { pro } = useContext(ProfessionalContext);
  const [infocliente, setinfocliente] = useState(null);

  const [openModalPerfil, setOpenModalPerfil] = useState(false);

  const userName = user && user.name ? user.name : "Carregando...";
  const userNameArray = userName.split(" ");
  let formattedName = '';

  const proName = pro && pro.name ? pro.name : "Carregando...";
  const proNameArray = userName.split(" ");
  let formattedNamePro = '';


  if (userNameArray.length === 1) {
    formattedName = userNameArray[0];
  } else {
    formattedName = `${userNameArray[0]} ${userNameArray[userNameArray.length - 1]}`;
  }

  if (proNameArray.length === 1) {
    formattedNamePro = userNameArray[0];
  } else {
    formattedNamePro = `${proNameArray[0]} ${proNameArray[proNameArray.length - 1]}`;
  }

  return (
    <>
      <div
        className="card-perfil-bottom"
        onClick={() => setOpenModalPerfil(true)}
      >
        <img src={iconPerfil} alt="Imagem de perfil" />
        <p style={{ color: "white" }}>
  {user && user.name ? `${user.name.split(" ")[0]}`: (pro && pro.name ? `${pro.name.split(" ")[0]}` : "Carregando...")}
</p>
      </div>
      {openModalPerfil && (
        <div className="modal-card-perfil">
          <div className="header-modal-card-perfil">
            <IoMdClose
              className="close-editar-perfil"
              onClick={() => setOpenModalPerfil(false)}
            />
            <img src={iconPerfil} alt="Imagem de perfil" />
            <FaPaintBrush className="icone-editar-perfil" />
          </div>
          <div className="info-card-perfil">
            <p>{formattedName ? formattedName : formattedNamePro }</p>
            <div className="linha-divisora"></div>
            <span>
              {infocliente ? infocliente.nmr_telefoneCliente : "Carregando..."}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
