import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export const PotentialChats = () => {
    const {potentialChats} = useContext(ChatContext);
    console.log("PotentialChats", potentialChats)
    return (<>iniciar conversa</>);
}   