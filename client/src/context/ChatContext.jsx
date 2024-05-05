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
    const [messages, SetMessage] = useState(null);
    const [isMessagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null)
    console.log(messages)
    useEffect(() => {

        if (user !== null) {
            const getPros = async () => {
                const response = await getRequest(`/user/allProfissionais`);
                if (response.error) {
                    return console.log("Erro ao buscar usuários", response);
                }

                const pChats = response.filter((professional) => {
                    // Verificar se o profissional já tem chat associado
                    const isChatCreated = userChats.some((chat) => {
                        return (
                            chat.user.chat.members[0] === professional.id_profissional ||
                            chat.user.chat.members[1] === professional.id_profissional
                        );
                    });
                    // Retornar true apenas para profissionais sem chat associado
                    return !isChatCreated;
                });

                setPotentialChats(pChats);
            };

            getPros();
        }

        if (pro !== null) {
            const getUsers = async () => {
                const response = await getRequest(`/professional/allUsers`);
                if (response.error) {
                    return console.log("Erro ao buscar usuários", response);
                }

                const filteredUsers = response.filter((user) => {
                    // Verificar se o usuário já tem chat associado
                    const isChatCreated = userChats.some((chat) => {
                        return (
                            chat.user.chat.members[0] === user.id_cliente ||
                            chat.user.chat.members[1] === user.id_cliente
                        );
                    });
                    // Retornar true apenas para usuários sem chat associado
                    return !isChatCreated;
                });

                setPotentialChats(filteredUsers);
            };

            getUsers();
        }
    }, [userChats, user, pro]);


    useEffect(() => {

        const getUserChats = async () => {
            if (user?.id_cliente) {

                setIsUserLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`/chat/${user?.id_cliente}`)
                setIsUserLoading(true);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }

            if (pro?.id_profissional) {

                setIsUserLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`/chat/${pro?.id_profissional}`)

                setIsUserLoading(true);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        }
        getUserChats();
    }, [])

    const createChat = useCallback(async (id_cliente, id_profissional) => {
        console.log(id_cliente, id_profissional)
if(pro !== null){
    console.log(pro)
    console.log("cliente")
        if (Object.keys(pro).length === 0) {
            console.log(pro)
            console.log("profissional")   // Invertendo os parâmetros se pro não for nullif (Object.keys(pro).length === 0) {
        } else {
            const temp = id_cliente;
            id_cliente = id_profissional;
            id_profissional = temp;
            
        }
    }




        const newChatData = {
            id_cliente: id_cliente,
            id_profissional: id_profissional
        };

        const response = await postRequest(`/chat/`, newChatData)

        if (response.error) {
            return console.log("ERRO", response)
        }

        setUserChats((prev) => [...prev, response])
    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat.user.chat)

    }, [])

    useEffect(() => {

        const getMessages = async () => {
            console.log(currentChat)
            setMessagesLoading(true);
            setMessagesError(false);
            try {
                const response = true
                setMessagesLoading(false);
                SetMessage(response);
            } catch (error) {
                return setMessagesError(error);
            }

        }
        getMessages();
    }, [currentChat])

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserLoading,
                userChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                messages,
                isMessagesLoading,
                messagesError,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
