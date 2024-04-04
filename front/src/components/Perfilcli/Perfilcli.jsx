import React, { useEffect, useState } from "react";
import iconPerfil from "../../assets/icone-perfil.png";
import { FaPaintBrush } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

export const Perfilcli = () => {
  const [infocliente, setinfocliente] = useState(null);
  const [formData, setFormData] = useState({
    idCliente: null,
    email: null,
  });
  const [openModalPerfil, setOpenModalPerfil] = useState(false);

  const getCookieData = () => {
    const userDataString = decodeURIComponent(Cookies.get("user"));
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setFormData({
        idCliente: userData.id_cliente,
        email: userData.email,
      });
    }
  };

  const infocli = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/selectinfos",
        formData
      );
      setinfocliente(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações do cliente:", error);
    }
  };

  useEffect(() => {
    getCookieData();
  }, []);

  useEffect(() => {
    if (formData.idCliente && !infocliente) {
      infocli();
    }
  }, [formData, infocliente]);

  return (
    <>
      <div
        className="card-perfil-bottom"
        onClick={() => setOpenModalPerfil(true)}
      >
        <img src={iconPerfil} alt="Imagem de perfil" />
        <p style={{ color: "white" }}>{infocliente ? infocliente.nm_cliente : "Carregando..."}</p>
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
            <p>{infocliente ? infocliente.nm_cliente : "Carregando..."}</p>
            <div className="linha-divisora"></div>
            <span>{infocliente ? infocliente.nmr_telefoneCliente : "Carregando..."}</span>
          </div>
        </div>
      )}
    </>
  );
};
