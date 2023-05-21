import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import "./WebChat.css"
import { auth, db, } from "../firebase"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";

export default function Search() {

    const {currentUser} = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)

    async function searchUser() {
        const q = query(collection(db, 'users'), where('displayName', '==', username));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        setUser(doc.data());
        });
    }
    function handleKey(e) {
        e.code == 'Enter' && searchUser()
    }

    async function handleSelect() {
        const combinedId = currentUser.uid > user.uid? currentUser.uid + user.uid : user.uid + currentUser.uid
        const res = await getDoc(doc(db, 'chats', combinedId))
        if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId),{messages:[]})
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid,), {
            [combinedId + '.userInfo']:{
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            },
            [combinedId+ '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', user.uid,), {
            [combinedId + '.userInfo']:{
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
            },
            [combinedId+ '.date']: serverTimestamp()
        })

        setUser(null)
        setUsername('')
    }

    return (
        <div>
            <input type="text" name="" id="" className="search-bar" placeholder="Поиск" onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} value={username}/>
            {user && <div className="person" style={{borderBottom: '1px solid #fdb970'}} onClick={handleSelect}>
                <img src={user.photoURL} alt="" className='profile-image'/>
                <span className="username">{user.displayName}</span>
            </div>}
        </div>
    )
}