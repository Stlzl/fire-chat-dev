import { signOut } from "firebase/auth"
import { onSnapshot, doc } from "firebase/firestore";
import "./WebChat.css"
import { auth, db } from "../firebase"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Search from "./Search";
import Chat from "./Chat";

export default function WebChat() {

    const [chats, setChats] = useState([])
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    
    useEffect(() => {
    const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data())
        });

        return () => {
            unsub();
        };
    }
    currentUser.uid && getChats()
    }, [currentUser.uid]) 

    if (!currentUser) {
        navigate('/');
    }

    function handleSelect() {

    }

    return (
        <div className="screen chat-screen">
            <div className="container">
                <div className="sidebar">
                    <div className="navbar">
                        <div className="person">
                        <div className="profile-image" style={{background: `url('${currentUser.photoURL}')`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                            <span className="username">{currentUser.displayName}</span>
                        </div>
                        <button className="logout-button" onClick={() => {
                            signOut(auth);
                            navigate('/');
                        }}>Выйти</button>
                    </div>
                    <div className="contact">
                        <Search />
                        {Object.entries(chats)?.map((chat) => (
                        <div className="person" key={chat[0]} onClick={handleSelect}>
                            <div className="profile-image" style={{background: `url('${chat[1].userInfo.photoURL}')`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                            <span className="username">{chat[1].userInfo.displayName}</span>
                        </div>
                        ))}
                    </div>
                </div>
                <Chat />
            </div>
        </div>
    )
}