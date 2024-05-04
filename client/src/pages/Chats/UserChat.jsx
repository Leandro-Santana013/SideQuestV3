import { axiosRecipientUser, axiosRecipientPro } from "../../hooks/axiosRecipient";

export const UserChat = ({ chat, user, pro }) => {
    console.log(chat)
    let recipientUser = null;
    let recipientPro = null;

    if (user !== null) {
        const userHookResult = axiosRecipientUser(chat, user);
        recipientUser = userHookResult.recipientUser;
    }

    if (pro !== null) {
        const proHookResult = axiosRecipientPro(chat, pro);
        recipientPro = proHookResult.recipientPro;
    }

    return (
        <div className="message-box">
            <div className="foto-perfil"></div>
            <div className="chatName">{user ? recipientUser?.nm_profissional : recipientPro?.nm_cliente}</div>
            <div className="text-chat-list">Text mesage</div>
            <div className="date-message">10/10/1010</div>
            <div className="chat-notification">3</div>
            <span className="user-online"></span>
        </div>
    );
};
