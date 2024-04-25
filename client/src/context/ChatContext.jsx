import {
    createContext,
    useCallback,
    useEffect,
    useState,
  } from "react";
  import { postRequest, baseUrl, getRequest } from "../utils/services";
  export const AuthContext = createContext();

  export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

        useEffect(() =>{
            const getUserChats = async()=>{
               if(user?.id_cliente){
                const response = await getRequest("/chat/")
               }
            }
        })
    return(
        <ChatContext.Provider
        value={{
            userChats,
            isUserLoading,
            userChatsError,
        }}
        >
        </ChatContext.Provider>
    )
  }
