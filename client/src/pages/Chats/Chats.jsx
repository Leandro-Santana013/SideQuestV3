import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { SidebarCliente, Header, Infoinc } from "../../components";
import "./chats.css";
export const Chats = () => {
    const { userChats, isUserLoading, userChatsError } = useContext(ChatContext);
    console.log(userChats);

    return (
        <>
            <Header />
            <SidebarCliente />
            <div className="content-midia">
                <div className="main-content">
                    <div className="container-chatList">
                        <p>Conversas</p>
                        <div className="chatList"></div>
                    </div>
                    <div className="chatBox">
                        <div className="header-chats"></div>
                        <div className="chat"></div>
                        <div className=""></div>
                    </div>
                </div>
            </div>
        </>
    );
};
