import React, { useContext, useState } from "react";
import "./chats.css";
import { SidebarCliente, CardProfissional, Header, Infoinc, TextInput } from "../../components";
import { ChatContext } from "../../context/ChatContext"
import { UserChat } from "./UserChat";
import { UserContext } from "../../context/UserContext"
import { PotentialChats } from "./PotentialChats";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import { ChatBox } from "./chatBox";
export const Chats = () => {
  const { user } = useContext(UserContext)
  const { pro } = useContext(ProfessionalContext)
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext)

  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">
        <div className="main-content">
          <Infoinc />
          <div className="chat-container">
            <div className="chat-list">
              <h3>Conversas</h3>
              <div className="chats-actives">
                <h3>Clique no profissional para criar chat</h3>
                <PotentialChats />
                <div className="container-chats-criados">
                  {userChats?.map((chat, index) => {
                    return (
                      <div key={index} onClick={() => updateCurrentChat(chat)}>
                        <UserChat chat={chat} user={user} pro={pro}></UserChat>
                      </div>
                    )
                  })}
                </div>
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
};