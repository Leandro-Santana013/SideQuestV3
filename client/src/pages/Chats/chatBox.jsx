import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ChatContext } from '../../context/ChatContext';
import { useRecipient } from '../../hooks/axiosRecipient';
import { ProfessionalContext } from '../../context/ProfissionalContext';
import moment from 'moment';
import './chatBox.css';
import { RiSendPlane2Fill } from 'react-icons/ri';

export const ChatBox = () => {
  const { user } = useContext(UserContext);
  const { pro } = useContext(ProfessionalContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage, senderMessageType, infoChat } = useContext(ChatContext);
  const { recipient, userType } = useRecipient(currentChat, user ? 'user' : 'pro');
  const [textMessage, setTextMessage] = useState('');
  const userId = user ? user.id_cliente : pro.id_profissional;
  const handleMessageSend = () => {
    sendTextMessage(textMessage, userId, currentChat._id, userType, setTextMessage);
  };

  if (!recipient) {
    return <div className='container-nenhum-chat-selecionado'><p className='nenhum-chat-selecionado'>Clique em algum chat para iniciar a conversa!</p></div>;
  }

  if (isMessagesLoading) {
    return <p>Carregando mensagens...</p>;
  }

  return (
    <>
      <div className="chat-header">
        <h3>{infoChat.nm_profissional || infoChat.nm_cliente}</h3>
      </div>
      <div className="chat-main">
        {messages &&
          messages.map((message, index) => (
            <div className="mensagens-chat-main">
              <div
                key={index}
                className={`${message.senderId == userId && message.senderType === senderMessageType ? 'msg-enviada' : 'msg-recebida'
                  }`}
              >
                <span className='msg-mensagens-chat-main'>{message.text}</span>
                <span className='time-mensagens-chat-main'>{moment(message.createdAt).calendar()}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="chat-sub">
        <input placeholder='Digite sua mensagem' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
        <button className="send-button" onClick={handleMessageSend}>
          <RiSendPlane2Fill />
        </button>
      </div>
    </>
  );
};
