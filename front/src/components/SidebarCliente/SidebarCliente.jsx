import React, { useEffect, useState } from "react";
import "./sidebarCliente.css";
import iconPerfil from '../../assets/icone-perfil.png'
import { FaPaintBrush } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from "axios"
import Cookies from "js-cookie";
  
export const SidebarCliente = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [infocliente, setinfocliente] = useState({})
  const [formData, setFormData] = useState({
    idCliente: null,
    email:null
  })
  const [openModalPerfil, setOpenModalPerfil] = useState(false)

  const pages = [
    { id: 1, name: "home", href: "homeCliente" },
    { id: 2, name: "perfil", href: "perfilCliente" },
    { id: 3, name: "chats", href: "chats" }, ,
    { id: 4, name: "favoritos", href: "favoritosCliente" },
    { id: 5, name: "histórico", href: "historicoCliente" },
    { id: 6, name: "pagamentos", href: "pagamentosCliente" },
  ];

  const getCookieData = () => {
    const userDataString = decodeURIComponent(Cookies.get("user"));
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Atualize o estado formData com os dados do cookie
      setFormData((prevFormData) => ({
        ...prevFormData,
        idCliente: userData.id_cliente,
        email: userData.email,
      }));
    }
  };

    const infocli = async () => {
      try {
        
        const response = await axios.get(
          "http://localhost:5000/auth/selectinfos", formData
        );
      setinfocliente(response.data);
      
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
  
    };

  useEffect(() => {
    
    for (let i = 0; i < pages.length; i++) {
      if (currentPage.includes(pages[i])) {
        // Atualizar o estado para destacar a página atual
        setCurrentPage(pages[i]);
        break;
      }
    }
  }, [currentPage, pages]);

  useEffect(() => {
    getCookieData();
  infocli();
  }, []);

  return (
    <nav className="sidebarCliente">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      ></link>
      <div className="options">
        {pages.map((page, index) => (
          <a
            key={index}
            href={`/${page.href}`}
            className={`option ${currentPage.includes(page.href) ? "active" : ""}`}
          >
            <div
              className={`connected-bar  ${currentPage.includes(page.href) ? "active" : ""
                }`}
              style={{ display: currentPage.includes(page.href) ? "flex" : "none" }}
            ></div>
            <i
              className={`${getIcon(page)} ${currentPage.includes(page) ? "active" : ""
                }`}
              style={{ color: currentPage.includes(page.href) ? "#3cbc8c" : "" }}
            ></i>
            <p style={{ color: currentPage.includes(page.href) ? "#3cbc8c" : "" }}>
              {getPageLabel(page)}
            </p>
          </a>
        ))}
      </div>
      <a
        href="/config"
        className={`config ${currentPage.includes("config") ? "active" : ""}`}
      >
        <div
          className={`option ${currentPage.includes("config") ? "active" : ""}`}
        >
          <div
            className={`connected-bar ${currentPage.includes("config") ? "active" : ""
              }`}
            style={{ display: currentPage.includes("config") ? "flex" : "" }}
          ></div>
          <i
            className={`fa-solid fa-gear ${currentPage.includes("config") ? "active" : ""
              }`}
            style={{ color: currentPage.includes("config") ? "#3cbc8c" : "" }}
          ></i>
          <p style={{ color: currentPage.includes("config") ? "#3cbc8c" : "" }}>
            Configurações
          </p>
        </div>
      </a>
      
      <div className="card-perfil-bottom" onClick={() => setOpenModalPerfil(true)}>
        <img src={iconPerfil} alt="Imagem de perfil" />
        <p style={{ color: "white" }}>{infocliente.nm_cliente}</p>
      </div>
      {
        openModalPerfil && (
          <div className="modal-card-perfil">
            <div className="header-modal-card-perfil">
              <IoMdClose className="close-editar-perfil" onClick={() => setOpenModalPerfil(false)}/>
              <img src={iconPerfil} alt="Imagem de perfil" />
              <FaPaintBrush className="icone-editar-perfil"/>
            </div>
            <div className="info-card-perfil">
                <p>{infocliente.nm_cliente}</p>
                <div className="linha-divisora"></div>
              <span>{infocliente.nmr_telefoneCliente}</span>
            </div>
          </div>
        )
      }
    </nav>
  );
};

// Funções auxiliares para obter o ícone e rótulo da página
const getIcon = (page) => {
  // Lógica para obter o ícone com base no nome da página
  // Substitua ou adicione a lógica conforme necessário
  // Exemplo: se o nome da página for 'perfil', retorna 'user'
  switch (page.href) {
    case "homeCliente":
      return "fa-solid fa-house";
    case "perfilCliente":
      return "fa-regular fa-user";
    case "chats":
      return "fa-regular fa-comments";
    case "favoritosCliente":
      return "fa-regular fa-star";
    case "historicoCliente":
      return "fa-solid fa-clock-rotate-left";
    case "pagamentosCliente":
      return "fa-solid fa-hand-holding-dollar";
    case "config":
      return "fa-solid fa-gear";
    default:
      return "";
  }
};

const getPageLabel = (page) => {
  // Lógica para obter o rótulo da página com base no nome da página
  // Substitua ou adicione a lógica conforme necessário
  // Exemplo: se o nome da página for 'perfil', retorna 'Perfil'
  return page.name.charAt(0).toUpperCase() + page.name.slice(1);
};
