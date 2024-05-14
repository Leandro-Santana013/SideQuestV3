import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const useRecipient = (chat, userType) => {
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);
    let recipientIds = []
    let recipientInfo = [];
    console.log(chat, "CHAT GAY")

    if (userType === 'pro') {
        recipientIds = [chat?.infoCliente.id_cliente];
        recipientInfo = chat?.infoCliente;
    } else {
        for (var i = 0; i < chat?.infoProfissional.length; i++) {
            recipientIds.push(chat?.infoProfissional[i].id_profissional);
            recipientInfo.push(chat?.infoProfissional[i]);
        }
    }
    useEffect(() => {
        const getUser = async () => {
            try {
                const responses = await Promise.all(recipientIds.map(async id => {
                    const endpoint = userType === 'pro' ? `/professional/find/${id}` : `/user/find/${id}`;
                    return await getRequest(endpoint);
                }));
                setRecipient(responses);
            } catch (error) {
                setError(error);
            }
        };
    
        getUser();
    }, [chat]);
       
    return { recipient, error, recipientInfo, userType };
};
