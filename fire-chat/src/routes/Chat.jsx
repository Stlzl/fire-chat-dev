import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import Messages from "./Messages"
import Input from "./Input"

export default function Chat() {

    const {data} = useContext(ChatContext)

    return (
        <div className="chat-container">
                    <div className="top-bar">
                        <div className="person">
                            <img src={data.user.photoURL} alt="" className='profile-image'/>
                            <span className="username">{data.user.displayName}</span>
                        </div>
                    </div>
                    <Messages />
                    <Input />
    </div>
    )
}