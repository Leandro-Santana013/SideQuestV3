import React, { useEffect, useState } from 'react';
import '../assets/remixicons/remixicon.css'

const NavbarCliente = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const pages = ["homeCliente", "perfil", "chats", "favoritos", "historico", "pagamentos",];

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
    <nav className="sidebarCliente">
      <div className="options">
        {pages.map((page, index) => (
          <a key={index} href={`/${page}`} className={`option ${currentPage.includes(page) ? 'active' : ''}`}>
            <div className={`connected-bar ${currentPage.includes(page) ? 'active' : ''}`}></div>
            <i className={`fa-regular fa-${getIcon(page)} ${currentPage.includes(page) ? 'active' : ''}`}></i>
            <p style={{ color: currentPage.includes(page) ? '#3cbc8c' : '' }}>{getPageLabel(page)}</p>
          </a>
        ))}
      </div>
      <a href="/config" className={`config ${currentPage.includes("config") ? 'active' : ''}`}>
        <div className={`option ${currentPage.includes("config") ? 'active' : ''}`}>
          <div className={`connected-bar ${currentPage.includes("config") ? 'active' : ''}`}></div>
          <i className={`fa-solid fa-gear ${currentPage.includes("config") ? 'active' : ''}`}></i>
          <p style={{ color: currentPage.includes("config") ? '#3cbc8c' : '' }}>Configurações</p>
        </div>
      </a>
    </nav>
  );
}

// Funções auxiliares para obter o ícone e rótulo da página
const getIcon = (page) => {
  // Lógica para obter o ícone com base no nome da página
  // Substitua ou adicione a lógica conforme necessário
  // Exemplo: se o nome da página for 'perfil', retorna 'user'
  switch (page) {
    case "homeCliente":
      return "house";
    case "perfil":
      return "user";
    case "chats":
      return "comments";
    case "favoritos":
      return "star";
    case "historico":
      return "clock-rotate-left";
    case "pagamentos":
      return "hand-holding-dollar";
    case "config":
      return "gear";
    default:
      return "";
  }
}

const getPageLabel = (page) => {
  // Lógica para obter o rótulo da página com base no nome da página
  // Substitua ou adicione a lógica conforme necessário
  // Exemplo: se o nome da página for 'perfil', retorna 'Perfil'
  return page.charAt(0).toUpperCase() + page.slice(1);
}

export default NavbarCliente;
