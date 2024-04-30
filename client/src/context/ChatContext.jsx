import {
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { postRequest, baseUrl, getRequest } from "../utils/services";
export const  ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([])

    useEffect(() =>{

        const getUsers = async () =>{
            const response = await getRequest(`/chat/users`);
                if(response.error){
                    return console.log("Erro ao buscar usuários", response)
                }    
            
                const pChats = response.filter((u) =>{
                    let isChatCreated = false;

                    if(user.id_cliente === u.id_cliente) return false;

                    if(userChats){
                        isChatCreated = userChats?.some((chat) => {
                            return chat.members[0] === u.id_cliente || chat.members[1] === u.id_cliente;
                        })
                    }

                    return !isChatCreated;
                })
            setPotentialChats(pChats)
        }
getUsers();
    },[userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.id_cliente) {
                console.log(user)
                setIsUserLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`/chat/${user?.id_cliente}`)
                console.log(response)
                setIsUserLoading(true);

                if (response.error) {
                    return setUserChatsError(response);
                }
                setUserChats(response);
            }
        }
        getUserChats();
    },[user])

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserLoading,
                userChatsError,
                potentialChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
