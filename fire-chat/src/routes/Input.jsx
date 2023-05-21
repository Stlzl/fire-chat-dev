import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { Timestamp, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { v4 as uuid} from "uuid";

export default function Input() {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext)

    const [text, setText] = useState('');

    const handleSubmit = async () => {
        await updateDoc(doc(db,'chats', data.chatId),{
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now()
            })
        })
    }

    return (
        <div className="input-chat">
            <input type="text" onChange={e => setText(e.target.value)}/>
            <button className="send-button" onClick={handleSubmit}>&#8594;</button>
        </div>
    )
}