import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/services";

export const useLatestMessage = (chat) =>{
    const {newMessage, notifications} = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);
    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`/message/${chat?._id}`)

            if(response.error){
                return console.log(error);
            }

            const lastMessage = response[response?.length - 1];
            console.log(lastMessage, 'laaaaa')
            setLatestMessage(lastMessage)
        };
        getMessages()
    }, [newMessage, notifications])

    return {latestMessage}
}