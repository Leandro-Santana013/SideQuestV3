import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';
import { useRecipient } from '../../hooks/axiosRecipient';
import { ProfessionalContext } from '../../context/ProfissionalContext';
import balaoChat from '../../assets/balao-de-pensamento.png';
import imgPerfil from "../../assets/icone-perfil.png";
import moment from 'moment';
import './chatBox.css';

export const ChatBox = () => {
  const { user } = useContext(UserContext);
  const { pro } = useContext(ProfessionalContext);
  const { onlineUsers, currentChat, messages, isMessagesLoading, sendTextMessage, senderMessageType, infoChat, userChats } = useContext(ChatContext);
  const { recipient, userType } = useRecipient(currentChat, user ? 'user' : 'pro');
  const [textMessage, setTextMessage] = useState('');
  const userId = user ? user.id_cliente : pro.id_profissional;
  const chatMainRef = useRef(null);

  const handleMessageSend = (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário
    if (textMessage.trim() !== '') {
      sendTextMessage(textMessage, userId, currentChat._id, userType, setTextMessage);
    }
  };

  useEffect(() => {
    if (chatMainRef.current) {
      chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
    }
  }, [messages]);

    if(userChats?.chats?.length==0){ return (<div className='message-chat'>
      <img src={balaoChat} className="img-balao"/>
      <h3>Nenhuma conversa por aqui</h3></div>);
    }

    if (!infoChat) {
      return <div className='container-nenhum-chat-selecionado'><p className='nenhum-chat-selecionado'>Clique em algum chat para iniciar a conversa!</p></div>;
    }
    const isOnlinePro = onlineUsers?.some((user) => user?.userID == infoChat.id_profissional && user.type == "pro");
    const isOnlineUser = onlineUsers?.some((user) => user?.userID ==infoChat.id_cliente && user.type == "user");
  if (isMessagesLoading) {
    return <p>Carregando mensagens...</p>;
  }

  return (
    <>
      <div className="chat-header">
        <div className="chat-header-img-name">
        <img className="img-profissional" src={pro ? infoChat.img_cliente ? infoChat.img_cliente : imgPerfil : null || user? infoChat.img_profissional ? infoChat.img_profissional : imgPerfil :null} />

        <h3>{ user ? infoChat.nm_profissional : infoChat.nm_cliente }</h3>
        </div>
        {isOnlineUser || isOnlinePro && 
        <div className="user-online">online</div>
        }
        </div>
      <div className="chat-main" ref={chatMainRef}>
        {messages &&
          messages.map((message, index) => (
            <div key={index} className="mensagens-chat-main">
              <div className={`${message.senderId == userId? 'msg-enviada' : 'msg-recebida'}`}>
                <span className='msg-mensagens-chat-main'>{message.text}</span>
                <span className='time-mensagens-chat-main'>{moment(message.createdAt).calendar()}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="chat-sub">
        <div className="messageBox">
          <input 
            required 
            placeholder="Mensagem..." 
            type="text" 
            id="messageInput" 
            value={textMessage} 
            onChange={(e) => setTextMessage(e.target.value)} 
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleMessageSend(e);
              }
            }} 
          />
          <button id="sendButton" onClick={handleMessageSend}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="33.67"
                stroke="#6c6c6c"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
