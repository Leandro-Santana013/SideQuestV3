import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const useRecipient = (chat, userType) => {
    console.log(chat, "type", userType)
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);
    let recipientIds = []
    let recipientInfo = [];


    if (userType == 'pro') {
        for (var i = 0; i < chat?.infoCliente?.length; i++) {
            recipientIds.push(chat?.infoCliente[i].id_cliente);
            recipientInfo.push(chat?.infoCliente[i]);
        }
    } else {
        for (var i = 0; i < chat?.infoProfissional?.length; i++) {
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
                console.log("RESPONSESSS",  responses)
                setRecipient(responses);
            } catch (error) {
                setError(error);
            }
        };
        console.log(recipient, "reeeee")
        getUser();
    }, [chat]);
       
    return { recipient, error, recipientInfo, userType, chat };
};
