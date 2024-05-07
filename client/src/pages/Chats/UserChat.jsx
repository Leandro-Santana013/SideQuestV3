import { useRecipient } from "../../hooks/axiosRecipient";
export const UserChat = ({ chat, user, pro }) => {
    let recipient = null;

    if (user !== null) {
        const { recipient: userRecipient } = useRecipient(chat, 'user');
        recipient = userRecipient;
    }

    if (pro !== null) {
        const { recipient: proRecipient } = useRecipient(chat, 'pro');
        recipient = proRecipient;
    }

    return (
        <div className="message-box">
            <div className="foto-perfil"></div>
            <div className="chatName">{recipient ? recipient.nm_profissional || recipient.nm_cliente : ""}</div>
            <div className="text-chat-list">Text mesage</div>
            <div className="date-message">10/10/1010</div>
            <div className="chat-notification">3</div>
            <span className="user-online"></span>
        </div>
    );
};
