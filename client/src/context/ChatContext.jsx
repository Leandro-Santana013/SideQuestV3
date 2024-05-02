import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user,}) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([])

    useEffect(() => {
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
    }, [userChats]);

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
        }
        getUserChats();
    }, [user])

    const createChat = useCallback(async (id_cliente, id_profissional) => {
        const newChatData = {
            id_cliente: id_cliente,
            id_profissional: id_profissional
        };

        const response = await postRequest(`/chat/`, newChatData)
        console.log(response)
        if (response.error) {
            return console.log("ERRO", response)
        }

        setUserChats((prev) => [...prev, response])
    }, [])

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserLoading,
                userChatsError,
                potentialChats,
                createChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
