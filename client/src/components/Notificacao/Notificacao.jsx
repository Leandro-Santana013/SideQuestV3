import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { ProfessionalContext } from "../../context/ProfissionalContext";
import moment from "moment";
import "./notificacao.css";

const Notificacao = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(UserContext);
    const { pro } = useContext(ProfessionalContext);
    const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } = useContext(ChatContext);

    
    let sender;
    const unreadNotifications = unreadNotificationsFunc(notifications);

    const modifiedNotifications = notifications.map((n) => {
        if (user) {   
            sender = allUsers.find(user => user.id_profissional == n.senderId);
        } else {
            sender = allUsers.find(user => user.id_cliente ==n.senderId);
        }

        if (user) {
            return {
                ...n,
                senderName: sender?.nm_profissional,
            };
        }

        if (pro) {
            return {
                ...n,
                senderName: sender?.nm_cliente,
            };
        }
    });

    return (
        <div className="notificacao" onClick={() => setIsOpen(!isOpen)}>
            <div className="notifications-icon"><i className="fa-solid fa-bell"></i>
            {unreadNotifications?.length === 0 ? null : (
                <div className="notifications-count">{unreadNotifications?.length}</div>
            )}
            </div>
            {isOpen ? (
                <div className="notification-box">
                    <div className="notifications-header">
                        <h3>Notificações</h3>
                        <div className="marcar-lida" onClick={() => markAllNotificationsAsRead(notifications)}>Marcar todas como lidas</div>
                    </div>
                    {modifiedNotifications?.length === 0 ? <span className="notification">Sem notificações por enquanto...</span> : null}
                    {modifiedNotifications && modifiedNotifications.map((n, index) => (
                        <div className={n.isRead ? 'notification' : 'notification not-read'} key={index} onClick={() => { markNotificationAsRead(n, userChats, user ? user : pro, notifications); setIsOpen(false); }}>
                            <span>{`${n.senderName} te enviou uma nova mensagem`}</span>
                            <span className="notification-time">{moment(n.date).calendar()}</span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default Notificacao;
