import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const useRecipient = (chat, userType) => {
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = userType === 'pro' ? chat?.user.info.id_cliente : chat?.user.infoProfissional.id_profissional;
    const recipientinfo = userType === 'pro' ? chat?.user.info : chat?.user.infoProfissional;
console.log(chat)
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return;

            try {
                const endpoint = userType === 'pro' ? `/professional/find/${recipientId}` : `/user/find/${recipientId}`;
                const response = await getRequest(endpoint);
                setRecipient(response);
            } catch (error) {
                setError(error);
            }
        };

        getUser();
    }, [recipientId, userType]);    

    return { recipient, error, recipientinfo, userType };
};
