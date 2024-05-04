import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const axiosRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    console.log("CHAT1", chat)
    const recipientId = chat?.user.infoProfissional.id_profissional;
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            try {
                const response = await getRequest(`/user/find/${recipientId}`);
                setRecipientUser(response);
            } catch (error) {
                setError(error);
            }
        };

        getUser();
    }, [recipientId]);

    return { recipientUser, error };
};

export const axiosRecipientPro = (chat, pro, user) => {
    const [recipientPro, setRecipientPro] = useState(null);
    const [error, setError] = useState(null);
    console.log("CHAT2", chat)
    const recipientId = chat?.user.info.id_cliente;

    useEffect(() => {
        const getPro = async () => {
            if (!recipientId) return null;

            try {
                const response = await getRequest(`/professional/find/${recipientId}`);
                console.log(response)
                setRecipientPro(response);
            } catch (error) {
                setError(error);
            }
        };

        getPro();
    }, [recipientId]);

    return { recipientPro, error };
};