import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user, pro }) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, SetMessages] = useState(null);
    const [isMessagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null)
    const [chat, setChat] = useState(null)
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)

    useEffect(() => {
        const fetchChats = async () => {
            if (!user && !pro) return;

            setIsUserLoading(true);
            setUserChatsError(null);

            try {
                let response;
                if (user) {
                    response = await getRequest(`/user/allProfissionais`);
                } else if (pro) {
                    response = await getRequest(`/professional/allUsers`);
                }

                if (response.error) {
                    console.error("Erro ao buscar usuários:", response.error);
                    setUserChatsError(response.error);
                    return;
                }

                const filteredChats = response.filter(item => {
                    const userId = user ? item.id_profissional : item.id_cliente;
                    return !userChats.some(chat => chat.user.chat.members.includes(userId));
                })
                // Retornar true apenas para profissionais sem chat associado


                setPotentialChats(filteredChats);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setUserChatsError(error);
            } finally {
                setIsUserLoading(false)
            }
        }
        fetchChats();
    }, [userChats, user, pro]);


    useEffect(() => {

        const getUserChats = async () => {
            if (user?.id_cliente || pro?.id_profissional) {

                setIsUserLoading(true);
                setUserChatsError(null);
                const endpoint = user?.id_cliente ? `/chat/${user.id_cliente}` : `/chat/${pro.id_profissional}`;
                const response = await getRequest(endpoint)
                setIsUserLoading(true);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        }
        getUserChats();
    }, [user, pro])

    const createChat = useCallback(async (id_cliente, id_profissional) => {
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

            if (response.error) {
                return console.log("ERRO", response)
            } else {
                setUserChats((prev) => [...prev, response])
            }
        } catch (error) {
            console.log("erro ao criar chat: ", error)
        }
    }, [pro, setUserChats])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat.user.chat)
        setChat(chat)
    }, [])

    useEffect(() => {

        const getMessages = async () => {
            setMessagesLoading(true);
            setMessagesError(false);

            try {
                const response = await getRequest(`/message/${currentChat._id}`)   
                SetMessages(response);
                setMessagesLoading(false);
            } catch (error) {
                return setMessagesError(error);
            }
           
        }
        getMessages();
    }, [currentChat])

    const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage) => {
        if(!textMessage) return console.log("Digite algo...")
        const sendMessageData = {
            chatId: currentChatId,
            senderId: sender,
            text: textMessage
        };
        console.log(sendMessageData)
       const response = await postRequest(`/message`, sendMessageData);
        
       if(response.error){
        return setSendTextMessageError(response);
       }
       
       setNewMessage(response);
       SetMessages((prev)=> [...prev, response])
       setTextMessage("");
    }, [])

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserLoading,
                userChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                currentChat,
                messages,
                isMessagesLoading,
                messagesError,
                chat,
                sendTextMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
