import React, { useEffect, useState } from "react";
import "./MenuBottomCliente.css";
import { Perfilcli } from "../index";
import { Link } from "react-router-dom";

export const MenuBottomCliente = () => {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const pages = [
        { id: 1, name: "home", href: "homeCliente" },
        { id: 2, name: "chats", href: "chats" }, ,
        { id: 3, name: "favoritos", href: "favoritosCliente" },
        { id: 4, name: "histórico", href: "historicoCliente" },
        { id: 5, name: "pagamentos", href: "pagamentosCliente" },
        { id: 6, name: "config", href: "config" }
    ];

    useEffect(() => {
        for (let i = 0; i < pages.length; i++) {
            if (currentPage.includes(pages[i])) {
                setCurrentPage(pages[i]);
                break;
            }
        }
    }, [currentPage, pages]);

    return (
        <div className="menu-bottom-cliente">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            ></link>

            <div className="options-menu-bottom">
                {
                    pages.map((page, index) => (
                        <Link key={index} to={`/${page.href}`} className={`option ${currentPage.includes(page.href) ? "active" : ""}`}>
                            <div className={`connected-bar-menu-bottom  ${currentPage.includes(page.href) ? "active" : ""}`}
                                style={{ backgroundColor: currentPage.includes(page.href) ? "#3cbc8c50" : "" }}
                            >
                                <i
                                    className={`${getIcon(page)} ${currentPage.includes(page) ? "active" : ""
                                        }`}
                                    style={{ color: currentPage.includes(page.href) ? "#3cbc8c" : "" }}
                                ></i>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

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

const getPageLabel = (page) => {
    return page.name.charAt(0).toUpperCase() + page.name.slice(1);
};