import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import "./MenuBottomProfissional.css";

export const MenuBottomProfissional = () => {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [translateMenu, setTranslateMenu] = useState(
        localStorage.getItem('menuExpanded') === 'true' ? 'translateY(0px)' : 'translateY(220px)'
    );
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 815);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 815);
        if (window.innerWidth <= 330) {
            setTranslateMenu(localStorage.getItem('menuExpanded') === 'true' ? 'translateY(0px)' : 'translateY(290px)');
        } else {
            setTranslateMenu(localStorage.getItem('menuExpanded') === 'true' ? 'translateY(0px)' : 'translateY(220px)');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const expandirMenu = () => {
        const newTranslateMenu = translateMenu === 'translateY(0px)' ? (window.innerWidth <= 330 ? 'translateY(290px)' : 'translateY(230px)') : 'translateY(0px)';
        setTranslateMenu(newTranslateMenu);
        localStorage.setItem('menuExpanded', newTranslateMenu === 'translateY(0px)');
    };

    const pages = [
        { id: 1, name: "home", href: "homeProfissionais" },
        { id: 2, name: "chats", href: "chats" },
        { id: 3, name: "perfil", href: "perfilProfissional" },
        { id: 4, name: "propostas", href: "propostasProfissional" },
        { id: 5, name: "Configurações", href: "ConfigProfissa" }
    ];

    useEffect(() => {
        const currentPath = window.location.pathname;
        const currentPage = pages.find(page => currentPath.includes(page.href));
        if (currentPage) {
            setCurrentPage(currentPage.href);
        }
    }, [pages]);

    return (
        <div className={`menu-bottom-profissional ${isMobile ? 'mobile' : ''}`} style={{ transform: isMobile ? translateMenu : 'none', transition: 'all .25s' }}>
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
        case "homeProfissionais":
            return "fa-solid fa-house";
        case "chats":
            return "fa-regular fa-comments";
        case 'perfilProfissional':
            return 'fa-solid fa-user-tie';
        case "favoritosProfissional":
            return "fa-regular fa-star";
        case "propostasProfissional":
            return "fa-solid fa-handshake";
        case "ConfigProfissa":
            return "fa-solid fa-gear";
        default:
            return "";
    }
};
