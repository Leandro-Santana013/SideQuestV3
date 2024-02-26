import React, { useEffect, useState } from 'react';
import '../styles/sidebarCliente.css'

const sidebarCliente = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const pages = ["home", "perfil", "chats", "favoritos", "historico", "pagamentos",];

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
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
      <div className="options">
        {pages.map((page, index) => (
            <a key={index} href={`/${page}`} className={`option ${currentPage.includes(page) ? 'active' : ''}`}>
            <div className={`connected-bar  ${currentPage.includes(page) ? 'active' : ''}`} style={{display: currentPage.includes(page) ? 'flex' : 'none'}}></div>
            <i className={`${getIcon(page)} ${currentPage.includes(page) ? 'active' : ''}`} style={{color: currentPage.includes(page) ? '#3cbc8c' : ''}} ></i>
            <p style={{ color: currentPage.includes(page) ? '#3cbc8c' : '' }}>{getPageLabel(page)}</p>
          </a>
        ))}
      </div>
      
      <a href="/config" className={`config ${currentPage.includes("config") ? 'active' : ''}`}>
        <div className={`option ${currentPage.includes("config") ? 'active' : ''}`}>
          <div className={`connected-bar ${currentPage.includes("config") ? 'active' : ''}`} style={{ display: currentPage.includes("config") ? 'flex' : '' }}></div>
          <i className={`fa-solid fa-gear ${currentPage.includes("config") ? 'active' : ''}`} style={{ color: currentPage.includes("config") ? '#3cbc8c' : '' }} ></i>
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
    case "home":
      return "fa-solid fa-house";
    case "perfil":
      return "fa-regular fa-user";
    case "chats":
      return "fa-regular fa-comments";
    case "favoritos":
      return "fa-regular fa-star";
    case "historico":
      return "fa-solid fa-clock-rotate-left";
    case "pagamentos":
      return "fa-solid fa-hand-holding-dollar";
    case "config":
      return "fa-solid fa-gear";
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

export default sidebarCliente;
