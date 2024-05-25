import React, { useEffect, useState } from "react";
import "./sidebarCliente.css";
import { Perfilcli } from "../index";
import { Link } from "react-router-dom";


export const SidebarCliente = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const pages = [
    { id: 1, name: "home", href: "homeCliente" },
    { id: 2, name: "chats", href: "chats" }, ,
    { id: 3, name: "favoritos", href: "favoritosCliente" },
    { id: 4, name: "histórico", href: "historicoCliente" },
    { id: 5, name: "pagamentos", href: "pagamentosCliente" },
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

  return (
    <>
      <nav className="sidebarCliente">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        ></link>
        <div className="options">
          {pages.map((page, index) => (
            <Link
              key={index}
              to={`/${page.href}`}
              className={`option ${currentPage.includes(page.href) ? "active" : ""}`}
            >
              <div
                className={`connected-bar  ${currentPage.includes(page.href) ? "active" : ""
                  }`}
                style={{ backgroundColor: currentPage.includes(page.href) ? "#3cbc8c50" : "" }}
              >
                <i
                  className={`${getIcon(page)} ${currentPage.includes(page) ? "active" : ""
                    }`}
                  style={{ color: currentPage.includes(page.href) ? "#3cbc8c" : "" }}
                ></i>
                <p style={{ color: currentPage.includes(page.href) ? "#3cbc8c" : "" }}>
                  {getPageLabel(page)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/config"
          className={`config ${currentPage.includes("config") ? "active" : ""}`}
        >
          <i className={`fa-solid fa-gear ${currentPage.includes("config") ? "active" : ""}`}>
          </i>
          <p>
            Configurações
          </p>
        </Link>
        {/* <Perfilcli /> */}
      </nav>
    </>
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
