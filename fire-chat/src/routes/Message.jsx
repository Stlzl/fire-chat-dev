import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext";

export default function Message({message}) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext)

    if(message.senderId = currentUser.uid) {
        return (
            <p className="user-message">{message.text}</p>
        )
    } else {
        return (
            <p className="message">{message.text}</p>
        )
    }
}