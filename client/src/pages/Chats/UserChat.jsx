import React, { useEffect, useState, useContext } from "react";
import { useRecipient } from "../../hooks/axiosRecipient";
import { ChatContext } from "../../context/ChatContext";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import { UserContext } from "../../context/UserContext";
import "./userChats.css";

export const UserChat = ({ chat }) => {
    const { pro } = useContext(ProfessionalContext);
    const { user } = useContext(UserContext);
    const { recipient, error, recipientInfo, userType } = useRecipient(chat, user ? 'user' : 'pro');
    const { onlineUsers, updateChatRecipientState, updateCurrentChat } = useContext(ChatContext);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleChatClick = (chatItem, recipientItem) => {
        console.log('Clicked chat item:', chatItem);
        console.log('Clicked recipient item:', recipientItem);
        updateCurrentChat(chatItem, recipientItem);

        if (userType === 'user') {
            console.log('Updating recipient state for professional ID:', recipientItem.id_profissional);
            updateChatRecipientState(recipientItem.id_profissional);
        } else {
            console.log('Updating recipient state for client ID:', recipientItem.id_cliente);
            updateChatRecipientState(recipientItem.id_cliente);
        }
    };

    return (
        <>
            {recipient && recipient.length > 0 && recipient.map((recipientItem, index) => {
                let chatItem, infoCliente, infoProfissional;

                if (userType === 'user') {
                    chatItem = chat.chats[index];
                    infoCliente = chat.infoCliente;
                    infoProfissional = chat.infoProfissional[index];
                } else if (userType === 'pro') {
                    chatItem = chat.chats[index];
                    infoCliente = chat.infoCliente[index];
                    infoProfissional = chat.infoProfissional;
                }

                const isOnlinePro = onlineUsers?.some((user) => user?.userID === infoProfissional.id_profissional && user.type === "pro");
                const isOnlineUser = onlineUsers?.some((user) => user?.userID === infoCliente.id_cliente && user.type === "user");

                return (
                    <div className="message-box" key={index} onClick={() => handleChatClick(chatItem, recipientItem)}>
                        <div className="foto-perfil"></div>
                        <div className="chatName">{userType === 'pro' ? infoCliente.nm_cliente : infoProfissional.nm_profissional}</div>
                        <div className="text-chat-list">{chatItem.text}</div> {/* Assuming there's a text property in chat item */}
                        <div className="date-message">10/10/1010</div> {/* Use chatItem.date or something similar */}
                        <div className="chat-notification">3</div> {/* Use chatItem.notificationCount or something similar */}
                        <div className={isOnlineUser || isOnlinePro ? "user-online" : ""}></div>
                    </div>
                );
            })}
        </>
    );
};
