import { axiosRecipientUser } from "../../hooks/axiosRecipient"

export const UserChat = ({chat, user}) =>{
    const {recipientUser} = axiosRecipientUser(chat, user);
    console.log(recipientUser);
    return (
     <div className="message-box">
        <div className="foto-perfil"></div>
        <div className="chatName">{recipientUser?.name}</div>
        <div className="text-chat-list">Text mesage</div>
        <div className="date-message">10/10/1010</div>
        <div className="chat-notification">3</div>
        <span className="user-online"></span>
     </div>
    )
}