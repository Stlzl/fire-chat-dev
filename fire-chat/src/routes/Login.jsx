import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./SignUp.css"
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        const email = event.target[0].value;
        const password = event.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/webchat')
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div className="screen-sign">
            <div className="form-container">
                <h1 className='sign-text'>Войти</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Пароль"/>
                    <button className='sign-button'>Продолжить</button>
                </form>
            </div>
        </div>
    )
}