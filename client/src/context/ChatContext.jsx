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
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}
