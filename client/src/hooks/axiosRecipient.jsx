import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const axiosRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    console.log(chat.members)
    const recipientId = chat?.members && chat.members.find((idProfissional) => String(idProfissional) !== String(user?.id_profissional));


    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            try {
                const response = await getRequest(`/user/find/${recipientId}`);
                setRecipientUser(response);
                console(response)
            } catch (error) {
                setError(error);
            }
        };

        getUser();
    }, [recipientId]);

    return { recipientUser, error };
};
