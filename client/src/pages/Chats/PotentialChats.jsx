import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { ProfessionalContext } from "../../context/ProfissionalContext";

export const PotentialChats = () => {
    const { user } = useContext(UserContext);
    const { pro } = useContext(ProfessionalContext);
    const { potentialChats, createChat } = useContext(ChatContext);
    const handleClick = (u) => {
        if (user !== null) {
           
            createChat(user.id_cliente, u.id_profissional);
        } 

        if(pro !== null){
            
            createChat(pro.id_profissional, u.id_cliente);
        }
    };

    return (
        <> 
            <div className="all-pro">
                {potentialChats && potentialChats.map((u, index) => {
                    return (
                        <div className="single-prof" key={index} onClick={() => handleClick(u)}>
                            {user? u.nm_profissional: ""} {pro? u.nm_cliente:""}
                            <span className="user-online"></span>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
