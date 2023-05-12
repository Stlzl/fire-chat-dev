import { Link } from "react-router-dom";
import "./MainPage.css"

export default function MainPage() {
    return (
        <div className="screen">
            <h1>Добро пожаловать в FireChat!</h1>
            <p>Что такое FireChat?<br></br> FireChat - многопользовательский вебчат, созданный с помощью JavaScript библиотеки React и сервиса FireBase от Google</p>
            <div className="buttonContainer">
                <Link to={`login`} className="loginButton">Войти</Link>
                <Link to={`signup`} className="signUpButton">Зарегистрироваться</Link>
            </div>
        </div>
    )
}