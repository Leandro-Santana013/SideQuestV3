import React, { useEffect, useState } from "react";
import "./sidebarProfissional.css";

import { Link } from "react-router-dom";

  
export const SidebarProfissional = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const pages = [
    { id: 1, name: "home", href: "homeProfissionais" },
    { id: 2, name: "chats", href: "chats" },
    { id: 3, name: "dashboard", href: "dashboard" },
    { id: 4, name: "favoritos", href: "favoritosProfissional" },
    { id: 5, name: "pagamentos", href: "pagamentosProfissional" },
    { id: 6, name: "propostas", href: "propostasProfissional" }
  ];


  useEffect(() => {
    
    for (let i = 0; i < pages.length; i++) {
      if (currentPage.includes(pages[i])) {
        // Atualizar o estado para destacar a página atual
        setCurrentPage(pages[i]);
        break;
      }
    }
  }, [currentPage, pages]);

  const [isActive, setIsActive] = useState(false); 

  const AcaoAoCLicar = () => {
    setIsActive(!isActive); // Alterna o valor de isActive
  };

  return (
    <>
    <nav className="sidebarProfissional">
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
        href="/ConfigProfissa"
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
    </nav>

    <header className="sidebarProfissa-responsivo">
        <nav className="navProfissa-responsivo"> 
          <ul className={`ulProfissa-responsivo ${isActive ? "active" : ""}`} onClick={AcaoAoCLicar}>
          <li><Link to={"/homeProfissionais"}>Home</Link></li>
              <li><Link to={"/chats"}>Chats</Link></li>
              <li><Link to={"/ConfigProfissa"}>Configurações</Link></li>
          </ul>
        </nav>
        <button className={`hamburguer-sidebarProfissa ${isActive ? "active" : ""}`} onClick={AcaoAoCLicar}>
        </button>
      </header>
    </>
  );
};

// Funções auxiliares para obter o ícone e rótulo da página
const getIcon = (page) => {
  // Lógica para obter o ícone com base no nome da página
  // Substitua ou adicione a lógica conforme necessário
  // Exemplo: se o nome da página for 'perfil', retorna 'user'
  switch (page.href) {
    case "homeProfissionais":
      return "fa-solid fa-house";
    case "chats":
      return "fa-regular fa-comments";
    case "dashboard":
      return "fa-sharp fa-solid fa-chart-line";
    case "favoritosProfissional":
      return "fa-regular fa-star";
    case "pagamentosProfissional":
      return "fa-solid fa-coins";
    case "propostasProfissional":
      return "fa-solid fa-handshake";
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