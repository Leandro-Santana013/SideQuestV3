import React, { useEffect, useState } from "react";
import { useRecipient } from "../../hooks/axiosRecipient";

export const UserChat = ({ chat, user, pro }) => {
    let recipient = null;
    let recipientName

    const [recipientNames, setRecipientNames] = useState([]);
    // Verifica se o usuário é do tipo cliente
    if (user !== null) {
        const { recipient: userRecipient } = useRecipient(chat, 'user');
        recipient = userRecipient;
    }

    // Verifica se o usuário é do tipo profissional
    if (pro !== null) {
        const { recipient: proRecipient } = useRecipient(chat, 'pro');
        recipient = proRecipient;
    }

    if (recipient && recipient.length > 0) {
        recipientName = pro ? recipient[0].nm_cliente : recipient.map(item => item.nm_profissional);
    }
    
    useEffect(() => {
        if (recipient) {
            const names = recipient.map(rec => rec.nm_profissional);
            setRecipientNames(names);
        }
    }, [recipient]);

    console.log("RECI", recipient)
    return (<>
       {recipientNames.map((name, index) => (
        <div className="message-box">
            <div className="foto-perfil"></div>
            <div className="chatName" key={index}>{name}</div>
            <div className="text-chat-list">Text message</div>
            <div className="date-message">10/10/1010</div>
            <div className="chat-notification">3</div>
            <span className="user-online"></span>
        </div>
        
    ))}
        </>
    );
};
