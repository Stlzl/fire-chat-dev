import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";

export default function Messages() {

    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
        const unSub = onSnapshot(doc(db,'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId]) 

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    return (
        <div className="chat">
            {messages.map(m =>(<Message message={m} key={m.id}/>))}
            <div ref={ref}></div>
        </div>
    )
}