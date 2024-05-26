import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const MenuBottomProfissional = () => {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const pages = [
        { id: 1, name: "home", href: "homeProfissionais" },
        { id: 2, name: "chats", href: "chats" },
        { id: 3, name: "dashboard", href: "dashboard" },
        { id: 4, name: "perfil", href: "perfilProfissional" },
        { id: 5, name: "pagamentos", href: "pagamentosProfissional" },
        { id: 6, name: "propostas", href: "propostasProfissional" },
        { id: 7, name: "Configurações", href: "ConfigProfissa" }
    ];

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentPage = pages.find(page => currentPath.includes(page.href));
        if (currentPage) {
            setCurrentPage(currentPage.href);
        }
    }, [pages]);

    return (
        <div className="menu-bottom-cliente">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            />
            <div className="options-menu-bottom">
                {pages.map((page) => (
                    <Link
                        key={page.id}
                        to={`/${page.href}`}
                        className={`option ${currentPage === page.href ? "active" : ""}`}
                    >
                        <div className={`connected-bar-menu-bottom ${currentPage === page.href ? "active" : ""}`}>
                            <i className={`${getIcon(page)} ${currentPage === page.href ? "active" : ""}`}></i>
                            {currentPage === page.href && <p>{page.name}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};  

const getIcon = (page) => {
    switch (page.href) {
        case "homeProfissionais":
            return "fa-solid fa-house";
        case "chats":
            return "fa-regular fa-comments";
        case "dashboard":
            return "fa-sharp fa-solid fa-chart-line";
        case 'perfilProfissional':
            return 'fa-solid fa-user-tie';
        case "favoritosProfissional":
            return "fa-regular fa-star";
        case "pagamentosProfissional":
            return "fa-solid fa-coins";
        case "propostasProfissional":
            return "fa-solid fa-handshake";
        case "ConfigProfissa":
            return "fa-solid fa-gear";
        default:
            return "";
    }
};
