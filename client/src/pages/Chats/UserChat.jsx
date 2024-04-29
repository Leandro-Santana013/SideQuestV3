import { axiosRecipientUser } from "../../hooks/axiosRecipient"

export const UserChat = ({chat, user}) =>{
    const {recipientUser} = axiosRecipientUser(chat, user);
    console.log(recipientUser);
    return (<>userChat</>)
}