import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import moment from "moment";
import "./notificacao.css"
const Notificacao = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useContext(UserContext)
    const {pro} = useContext(ProfessionalContext)
    const {notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead,} = useContext(ChatContext)

let sender
   const unreadNotifications = unreadNotificationsFunc(notifications)

   const modifiedNotifications = notifications.map((n) => {
        if(user){   
            sender = allUsers.find(user => user.id_profissional == n.senderId);
        } else{
            sender = allUsers.find(user => user.id_cliente == n.senderId);
        }
        console.log(sender, "sender")

        if(user){
        return {
            ...n,
            senderName: sender?.nm_profissional,
        };}

        if(pro){
            return {
                ...n,
                senderName: sender?.nm_cliente,
            };}
   });

   // console.log( unreadNotifications, "un")
   console.log(modifiedNotifications, "NOTU2")

   return ( 
        <div className="notificacao" onClick={() => setIsOpen(!isOpen)}>
        <div className="notifications-icon"><i class="fa-solid fa-bell"></i></div>
        {unreadNotifications?.length === 0 ? null : (
            <div className="notifications-count">{unreadNotifications?.length}</div>
        )}
        {isOpen? (
            <div className="notification-box">
                <div className="notifications-header">
            <h3>Notificações</h3>
            <div className="marcar-lida" onClick={() => markAllNotificationsAsRead(notifications)}>Marcar todas como lidas</div>
        </div>
        {modifiedNotifications?.length === 0 ? <span className="notification">Sem notificações por em quanto...</span>: null}
        {modifiedNotifications && modifiedNotifications.map((n, index) => {
            return ( 
                <div className= {n.isRead ? 'notification' : 'notification not-read'} key={index} onClick={() => markNotificationAsRead(n, userChats, user? user : pro, notifications)}>
                    <span>{`${n.senderName} te enviou uma nova menssagem`}</span>
                    <span className="notification-time ">{moment(n.date).calendar()}</span>
                </div>
            )
        })}
        </div>
        ): null}
        </div>
    );
}
 
export default Notificacao;