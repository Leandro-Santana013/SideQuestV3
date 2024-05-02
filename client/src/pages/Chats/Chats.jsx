import React,{useContext, useState} from "react";
import "./chats.css";
import { SidebarCliente, CardProfissional, Header, Infoinc, TextInput} from "../../components";
import { RiSendPlane2Fill } from "react-icons/ri";
import {ChatContext} from "../../context/ChatContext"
import { UserChat } from "./UserChat";
import {UserContext} from "../../context/UserContext"
import { PotentialChats } from "./PotentialChats";
import { ProfessionalContext } from "../../context/ProfissionalContext";

export const Chats = () => {
  const {pro} = useContext(ProfessionalContext)
  const  {userChats, isUserChatsLoading, userChatsError} = useContext(ChatContext)
  return (
    <>
      <Header />
      <SidebarCliente />
      <div className="content-midia">

        <div className="main-content">
              <Infoinc/>
              <div className="chat-container">
                <div className="chat-list">
                  <h3>Conversas</h3>
                  <div className="chats-actives">
                    <PotentialChats/>
                    {userChats?.map((chat,index) =>{
                      return(
                        <div key={index}>
                          <UserChat chat={chat} user={pro}></UserChat>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="chat-box">
                  <div className="chat-header">joão Silva</div>
                  <div className="chat-main"></div>
                  <div className="chat-sub"><TextInput
                          type="text"
                          size={{ width: "35vw", height: "1.5vw" }}
                          
                        />
                        <button className="send-button"><RiSendPlane2Fill className="icon-send" /></button>
                        </div>
                </div>
              </div>
      </div>
      </div>
    </>
  );
};