import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
import { useRecipient } from "../hooks/axiosRecipient";
export const ChatContext = createContext();
import { io } from "socket.io-client"

export const ChatContextProvider = ({ children, user, pro }) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setMessagesLoading] = useState(null);
    const [messagesError, setMessagesError] = useState(null)

    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [senderMessageType, setSenderMessageType] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)
    const [recipientOnChat, setRecipientOnChat] = useState(null)
    const [notifications, setNotifications] = useState([])
    console.log(notifications, "notifications")
    useEffect(() => {
        const newSocket = io('http://localhost:3000')
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [user, pro])

    useEffect(() => {   
        if (socket === null) return;
        try {
            if (user) {
                socket.emit("newAddUser", { id: user.id_cliente, type: "user" });
            } else if (pro) {
                socket.emit("newAddUser", { id: pro.id_profissional, type: "pro" });
            }
        } finally {
            socket.on("getOnlineUsers", (res) => {
                setOnlineUsers(res)
            });

           
        }
    }, [socket, ])
  
console.log(currentChat?.members, "mw")
    useEffect(() => {   
        if (socket === null) return;
       socket.emit("sendMessage", {newMessage: newMessage, recipientOnChat})
    }, [newMessage])

    useEffect(() => {  
        if (socket === null) return;
       socket.on("getMessage", res => {
        if(currentChat?._id !== res.newMessage.user.chatId) return
        setMessages((prev) => [...prev, res.newMessage.user]);
       })

       socket.on("getNotification", res => {
        const isChatOpen = currentChat?.members.some(id => id === res.senderId)

        if(isChatOpen){
            setNotifications(prev => [{...res, isRead: true}, ...prev])
        }else{
            setNotifications(prev => [res, ...prev])
        }
       })

       return () => {
        socket.off("getMessage");
        socket.off("getNotifications");
    }
    }, [socket, currentChat,newMessage,])


    const updateChatRecipientState = useCallback((info) => {
        setRecipientOnChat(info);
      }, []);
    useEffect(() => {

        const getUserChats = async () => {
            if (user?.id_cliente || pro?.id_profissional) {
                setIsUserLoading(true);
                setUserChatsError(null);
                const endpoint = user?.id_cliente ? `/chat/user/${user.id_cliente}` : `/chat/pro/${pro.id_profissional}`;
                const response = await getRequest(endpoint)
                setIsUserLoading(true);

                if (response.error) {
                    return setUserChatsError(response);
                }
            
                setUserChats(response)
                setMessagesLoading(false);
            }
        }
        getUserChats();
    }, [user, pro,])

    const [infoChat, setInfoChat] = useState()
    const updateCurrentChat = useCallback((chat, chatItem) => {
        setCurrentChat(chat)
        setInfoChat(chatItem)


    }, [])

    const createChat = useCallback(async (id_cliente, id_profissional) => {
        console.log(id_cliente, id_profissional)
        try {
            // Swap IDs if 'pro' is not null
            if (pro !== null) {
                console.log("Professional");
                if (Object.keys(pro).length === 0) {
                    console.log("profissional sem informaçoes");
                } else {
                              console.log("Swapping IDs");
                    [id_cliente, id_profissional] = [id_profissional, id_cliente];
                }
            } else {
                console.log("No professional provided");
            }

            const newChatData = {
                id_cliente: id_cliente,
                id_profissional: id_profissional
            };

            const response = await postRequest(`/chat/`, newChatData)

            setCurrentChat(response.user.chat);

        } catch (error) {
            console.log("erro ao criar chat: ", error)
        }
    }, [])


    useEffect(() => {
        setMessagesLoading(true);

        const getMessages = async () => {
            setMessagesError(false);
            try {
                setMessagesLoading(true);
                const response = await getRequest(`/message/${currentChat._id}`)
                setMessages(response);
                setMessagesLoading(false);
            } catch (error) {
                return setMessagesError(error);
            }
                setMessagesLoading(null);

        }
        getMessages();
    }, [currentChat,])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, senderType, setTextMessage) => {
        if (!textMessage) return console.log("Digite algo...");
        const sendMessageData = {
            chatId: currentChatId,
            senderId: sender,
            senderType: senderType, // Adicionando o tipo de remetente
            text: textMessage
        };
        const response = await postRequest(`/message`, sendMessageData);
        if (response.error) {
            return setSendTextMessageError(response);
        }
        setNewMessage(response);
        setSenderMessageType(response.user.senderType)
        setMessages((prev) => [...prev, response.user]);

        setTextMessage("");
    }, []);

    

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserLoading,
                userChatsError,
                createChat,
                updateCurrentChat,
                currentChat,
                messages,
                isMessagesLoading,
                messagesError,
                sendTextMessage,
                senderMessageType,
                infoChat,
                updateChatRecipientState,
                onlineUsers,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
