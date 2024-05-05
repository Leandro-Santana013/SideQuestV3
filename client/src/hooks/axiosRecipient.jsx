import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const axiosRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.user.infoProfissional.id_profissional;
    console.log(recipientId)
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

export const axiosRecipientPro = (chat, pro) => {
    const [recipientPro, setRecipientPro] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.user.info.id_cliente;
    console.log(recipientId)

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