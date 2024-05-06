import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ChatContext } from '../../context/ChatContext'
import { useRecipient } from '../../hooks/axiosRecipient'
import { ProfessionalContext } from '../../context/ProfissionalContext'
import moment from 'moment'
import "./chatBox.css"
import { RiSendPlane2Fill } from "react-icons/ri";

export const ChatBox = () => {
  const { user } = useContext(UserContext)
  const { pro } = useContext(ProfessionalContext)
  const { currentChat, messages, isMessagesLoading, chat, sendTextMessage } = useContext(ChatContext)
  const { recipient } = useRecipient(chat, user ? 'user' : 'pro')
  const [textMessage, setTextMessage] = useState('')

  return (
    <>
      {!recipient && (
        <p>Nenhuma conversa selecionada...</p>
      )}

      {isMessagesLoading && (
        <p>Carregando mensagens...</p>
      )}

      {recipient && user && (
        <>
          <div className="chat-header">{recipient.nm_profissional || recipient.nm_cliente}</div>
          <div className="chat-main">
            <div className='messages'>
              {messages && messages.map((message, index) => (
              <div key={index} className={`${message?.senderId == 6 ? 'msg-enviada': 'msg-recebida'}`}>
                <span>{message.text}</span>
                <span>{moment(message.createdAt).calendar()}</span>
              </div>
              ))}
            </div>
          </div>
          <div className="chat-sub">
           <input 
           value={textMessage}
           onChange={(e) => setTextMessage(e.target.value)} 
           ></input>
          </div>
          <button className='send-button' onClick={() => sendTextMessage(textMessage, user.id_cliente, currentChat._id, setTextMessage)}><RiSendPlane2Fill/></button>
        </>
      )}
    </>

    
  )
  
}