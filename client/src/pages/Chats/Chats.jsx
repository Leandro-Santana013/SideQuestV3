import React, { useContext, useEffect, useState } from "react";
import "./chats.css";
import { SidebarCliente, CardProfissional, Header, Infoinc, TextInput, SidebarProfissional} from "../../components";
import { ChatContext } from "../../context/ChatContext"
import { UserChat } from "./UserChat";
import { UserContext } from "../../context/UserContext"
import { ProfessionalContext } from "../../context/ProfissionalContext";
import { ChatBox } from "./chatBox";
export const Chats = () => {
  const { user } = useContext(UserContext)
  const { pro } = useContext(ProfessionalContext)
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat, } = useContext(ChatContext)
  console.log(userChats, "userhats")
  return (
    <>
      <Header />
      {pro ? <SidebarProfissional /> : <SidebarCliente />}
      <div className="content-midia">
        <div className="main-content">
          <div className="chat-container">
            <div className="chat-list">
              <h3>Conversas</h3>
              <div className="chats-actives">
                      <UserChat userType={pro ? pro : user} chat={userChats}  />
                    </div>             
                    </div>
            <div className="chat-box">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}