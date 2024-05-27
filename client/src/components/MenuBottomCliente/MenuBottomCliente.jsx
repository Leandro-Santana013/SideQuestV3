import React, { useEffect, useState } from "react";
import "./MenuBottomCliente.css";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

export const MenuBottomCliente = () => {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [translateMenu, setTranslateMenu] = useState(
        localStorage.getItem('menuExpanded') === 'true' ? 'translateY(0px)' : 'translateY(160px)'
    );
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 815);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 815);
        if (window.innerWidth <= 330) {
            setTranslateMenu(localStorage.getItem('menuExpanded') === 'true' ? 'translateY(0px)' : 'translateY(220px)');
        } else {
            setTranslateMenu(localStorage.getItem('menuExpanded') === 'true' ? 'translateY(0px)' : 'translateY(150px)');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const expandirMenu = () => {
        const newTranslateMenu = translateMenu === 'translateY(0px)' ? (window.innerWidth <= 330 ? 'translateY(220px)' : 'translateY(150px)') : 'translateY(0px)';
        setTranslateMenu(newTranslateMenu);
        localStorage.setItem('menuExpanded', newTranslateMenu === 'translateY(0px)');
    };

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
        <div className={`menu-bottom-cliente ${isMobile ? 'mobile' : ''}`} style={{ transform: isMobile ? translateMenu : 'none', transition: 'all .25s' }}>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            />
            <button className="btn-expandir-menu-bottom" onClick={() => expandirMenu()}><IoMenu /></button>
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
