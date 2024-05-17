import React, { useEffect, useState, useContext } from "react";
import { useRecipient } from "../../hooks/axiosRecipient";
import { ChatContext } from "../../context/ChatContext";

export const UserChat = ({ chat }) => {
    const { recipient, error, recipientInfo, userType } = useRecipient(chat, 'user');
    const { updateCurrentChat } = useContext(ChatContext);
    console.log(recipient, "REC")
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {recipient && recipient.length > 0 && recipient.map((recipientItem, index) => {
                const chatItem = chat.chats[index]; 
                const infoCliente = chat.infoCliente; // InfoCliente for the chat
                const infoProfissional = chat.infoProfissional[index]; // Corresponding infoProfissional item

                return (
                    <div className="message-box" key={index} onClick={() => updateCurrentChat(chatItem, recipientItem)}
                    >
                        <div className="foto-perfil"></div>
                        <div className="chatName">{userType == 'pro' ? infoCliente.nm_cliente : infoProfissional.nm_profissional}</div>
                        <div className="text-chat-list">{chatItem.text}</div> {/* Assuming there's a text property in chat item */}
                        <div className="date-message">10/10/1010</div> {/* Use chatItem.date or something similar */}
                        <div className="chat-notification">3</div> {/* Use chatItem.notificationCount or something similar */}
                        <span className="user-online"></span>
                    </div>
                );
            })}
        </>
    );
};
