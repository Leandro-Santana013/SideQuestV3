import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, getRequest } from "../utils/services";
export const axiosRecipient = (chat, user) =>{
    const {recipientUser, setRecipientUser} = useState(null);
    const [error, setError] = useState(null)

    const recipientId = chat?.members.find((id) => id !==user?.idCliente)

    useEffect(() =>{
        const getUser = async()=>{

            if(!recipientId) return null

            const response = await getRequest(`/user/`)
        }
    },[])
}