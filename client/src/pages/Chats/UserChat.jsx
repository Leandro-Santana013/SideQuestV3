import React, { useEffect, useState, useContext } from "react";
import { useRecipient } from "../../hooks/axiosRecipient";
import { ChatContext } from "../../context/ChatContext";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import { UserContext } from "../../context/UserContext";
import imgPerfil from "../../assets/icone-perfil.png";
import moment from 'moment';
import "./userChats.css";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useLatestMessage } from "../../hooks/useLatestMessage";
export const UserChat = ({ chat }) => {
    const { pro } = useContext(ProfessionalContext);
    const { user } = useContext(UserContext);
    const { recipient, error, recipientInfo, userType } = useRecipient(chat, user ? 'user' : 'pro');
    const { onlineUsers, updateChatRecipientState, updateCurrentChat, notifications, markThisNotificationAsRead } = useContext(ChatContext);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleChatClick = (chatItem, recipientItem) => {
        updateCurrentChat(chatItem, recipientItem);
        if (userType === 'user') {
            updateChatRecipientState(recipientItem.id_profissional);
        } else {
            updateChatRecipientState(recipientItem.id_cliente);
        }
    };

    let chatItem1

        recipient && recipient.length > 0 && recipient.map((recipient, index) => {
            if (userType === 'user') {
                chatItem1 = chat.chats[index];
        
            } else if (userType === 'pro') {
                chatItem1 = chat.chats[index];
            }
        })

    

    const { latestMessage } = useLatestMessage(chatItem1);

    const truncateText = (text) => {
        let shortText = text.substring(0, 20)

        if (text.length > 20) {
            shortText = shortText + '...'
        }

        return shortText;
    }

    return (
        <>
            {recipient && recipient.length > 0 && recipient.map((recipientItem, index) => {
                let chatItem, infoCliente, infoProfissional;

                const unreadNotifications = unreadNotificationsFunc(notifications)
                const thisUserNotification = unreadNotifications.filter(
                    n => n.senderId == user ? recipientItem?.id_profissional : recipientItem?.id_cliente
                )


                if (userType === 'user') {
                    chatItem = chat.chats[index];
                    infoCliente = chat.infoCliente;
                    infoProfissional = chat.infoProfissional[index];
                } else if (userType === 'pro') {
                    chatItem = chat.chats[index];
                    infoCliente = chat.infoCliente[index];
                    infoProfissional = chat.infoProfissional;
                }


                const isOnlinePro = onlineUsers?.some((onlineUser) => onlineUser.userID === infoProfissional.id_profissional && onlineUser.type === "pro");
                const isOnlineUser = onlineUsers?.some((onlineUser) => onlineUser.userID === infoCliente.id_cliente && onlineUser.type === "user");

                const isOnline = userType === 'user' ? isOnlinePro : isOnlineUser;
                return (

                    <div className="message-box" key={index} onClick={() => {
                        handleChatClick(chatItem, recipientItem);
                        if (thisUserNotification?.length !== 0) {
                            markThisNotificationAsRead(thisUserNotification, notifications)
                        };
                    }}>

                        <div className="foto-name">
                            <img className="foto-perfil" src={userType === 'pro' ? infoCliente.img_cliente ? infoCliente.img_cliente : imgPerfil : null || user ? infoProfissional.nm_img_profissional ? infoProfissional.nm_img_profissional : imgPerfil : null} />
                            <div className={isOnline ? "user-online" : "user-offline"}></div>
                            <div className="name-message">
                                <div className="chatName">{userType === 'pro' ? infoCliente.nm_cliente : infoProfissional.nm_profissional}</div>
                                <p className="last-message">{latestMessage?.text && (
                                    <span>{truncateText(latestMessage?.text)}</span>
                                )}</p>
                            </div>
                        </div>
                        <div className="text-chat-list">{chatItem.text}</div> {/* Assuming there's a text property in chat item */}
                        <div className="date-message">{moment(latestMessage?.createdAt).calendar()}</div> {/* Use chatItem.date or something similar */}
                        <div className={thisUserNotification?.length > 0 ? "this-user-notifications" : ""}>{thisUserNotification?.length > 0 ? thisUserNotification?.length : ""}</div>
                    </div>
                );
            })}
        </>
    );
};
