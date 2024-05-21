import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";

const Notificacao = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useContext(UserContext)
    const {notifications, userChats, allUsers} = useContext(ChatContext)
   //const unreadNotifications = unreadNotificationsFunc(notifications)

//    const modifiedNotifications = notifications.map((n) => {
//         const sender = allUsers.find(user => user.id_cliente === n.senderId)
//    })
   return ( 
        <div className="notificacao" onClick={() => setIsOpen(!isOpen)}>
        <div className="notifications-icon"><i class="fa-solid fa-bell"></i></div>
        
        {isOpen? (
            <div className="notification-box">
            <h3>Notificações</h3>
            <div className="marcar-lida">Marcar todas como lidas</div>
        </div>
        ): null}
        </div>
    );
}
 
export default Notificacao;