import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth,db,storage } from "../firebase"
import { doc, setDoc } from "firebase/firestore"; 
import './SignUp.css'

export default function SignUp() {

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault()
        const displayName = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const file = event.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, `images/${res.user.uid}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: displayName,
                            photoURL: downloadURL,
                        })
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName: displayName,
                            email: email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, 'userChats', res.user.uid),{})
                        navigate('/webchat')
                    });
                }
            );

              
        
        } catch(err) {
            console.log(err)
        }
        console.log(auth)
    }



    return (
        <div className="screen-sign">
            <div className="form-container">
                <h1 className='sign-text'>Регестрация</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Имя"/>
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Пароль"/>
                    <label htmlFor="file"><span className='icon' >&#128206;</span>Прикрепите фото профиля</label>
                    <input type="file" name="" id="file" style={{display: 'none'}}/>
                    <button className='sign-button'>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}
