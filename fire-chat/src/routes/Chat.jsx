import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Chat() {

    

    return (
        <div className="chat-container">
                    <div className="top-bar">
                        <div className="person">
                            <img src="https://images.unsplash.com/photo-1682709846996-f3c895743d37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" alt="" className='profile-image'/>
                            <span className="username">John</span>
                        </div>
                    </div>
                    <div className="chat">
                        <p className="message">Привет</p>
                        <p className="user-message">Дарова</p>
                    </div>
                    <div className="input-chat">
                        <input type="text" />
                        <button className="send-button">&#8594;</button>
                    </div>
                </div>
    )
}