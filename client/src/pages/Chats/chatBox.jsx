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
  const { currentChat, messages, isMessagesLoading, chat, sendTextMessage, senderMessageType} = useContext(ChatContext);
  const { recipient, userType } = useRecipient(chat, user ? 'user' : 'pro');
  const [textMessage, setTextMessage] = useState('');
  const userId = user ? user.id_cliente : pro.id_profissional;

  const handleMessageSend = () => {
    sendTextMessage(textMessage, userId, currentChat._id, userType , setTextMessage);
  };

  if (!recipient) {
    return <p>Nenhuma conversa selecionada...</p>;
  }

  if (isMessagesLoading) {
    return <p>Carregando mensagens...</p>;
  }

  return (
    <>
      <div className="chat-header">{recipient.nm_profissional || recipient.nm_cliente}</div>
      <div className="chat-main">
        <div className="messages">
        {messages &&
    messages.map((message, index) => (
        <div
            key={index}
            className={`${
                message.senderId == userId && message.senderType === senderMessageTe ? 'msg-enviada' : 'msg-recebida'
            }`}
        >
            <span>{message.text}</span>
            <span>{moment(message.createdAt).calendar()}</span>
        </div>
))}

        </div>
      </div>
      <div className="chat-sub">
        <input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
        <button className="send-button" onClick={handleMessageSend}>
          <RiSendPlane2Fill />
        </button>
      </div>
    </>
  );
};
