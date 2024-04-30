import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";

export const axiosRecipientUser = (chat, user) =>{
    const {recipientUser, setRecipientUser} = useState(null);
    const [error, setError] = useState(null)

    const recipientId = chat?.members.find((idCliente) => idCliente !==user?.idCliente)

    useEffect(() =>{
        const getUser = async()=>{

            if(!recipientId) return null

            const response = await getRequest(`/user/find/${recipientId}`)

            if(response.error){
                return setError(error);
            }

            setRecipientUser(response);
        }

        getUser();
    },[])

    return {recipientUser}
}