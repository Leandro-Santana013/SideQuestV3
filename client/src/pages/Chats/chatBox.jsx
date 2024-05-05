import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { ChatContext } from '../../context/ChatContext'
import { axiosRecipientPro, axiosRecipientUser } from '../../hooks/axiosRecipient'
import { ProfessionalContext } from '../../context/ProfissionalContext'

export const ChatBox = () => {
    const {user} = useContext(UserContext)
    const {pro} = useContext(ProfessionalContext)
    const {currentChat, messages, isMessagesLoading} = useContext(ChatContext)
    const {recipientUser} = axiosRecipientUser(currentChat, user)
    const {recipientPro} = axiosRecipientPro(currentChat, pro)
    console.log("r", recipientPro, recipientUser)
    if(!recipientUser && !recipientPro){
        return(
            <p>Nenhuma conversa selecionada...</p>
        )
    }
    return (
    <>
      <div className="chat-header">joão Silva</div>
                  <div className="chat-main"></div>
                  <div className="chat-sub"><TextInput
                          type="text"
                          size={{ width: "35vw", height: "1.5vw" }}
                          
                        />
                        <button className="send-button"><RiSendPlane2Fill className="icon-send" /></button>
                        </div>
    </>
  )
}
