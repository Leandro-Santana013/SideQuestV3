import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";

export const PotentialChats = () => {
    const {user} = useContext(UserContext)
    const {potentialChats, createChat} = useContext(ChatContext);
    console.log("PotentialChats", potentialChats)
    return (
    <>
    <div className="all-pro">
        {potentialChats && potentialChats.map((u, index)=>{
            return(
            <div className="single-prof" key={index} onClick={()=> createChat(user.id_cliente, u.id_profissional)}>
                 {u.nm_profissional} 
                 <span className="user-online"></span>
            </div>
            )
        })}
    </div>
    </>);
}   