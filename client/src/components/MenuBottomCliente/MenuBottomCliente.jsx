import React, { useEffect, useState } from "react";
import "./MenuBottomCliente.css";
import { Link } from "react-router-dom";
import "./MenuBottomCliente.css"

export const MenuBottomCliente = () => {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const pages = [
        { id: 1, name: "Home", href: "homeCliente" },
        { id: 2, name: "Chats", href: "chats" },
        { id: 3, name: "Favoritos", href: "favoritosCliente" },
        { id: 4, name: "Histórico", href: "historicoCliente" },
        { id: 5, name: "Pagamentos", href: "pagamentosCliente" },
        { id: 6, name: "Configurações", href: "config" }
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
