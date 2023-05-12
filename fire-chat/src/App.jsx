import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import WebChat from './routes/WebChat';
import MainPage from "./routes/MainPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />
    },
    { 
      path: "/webchat",
      element: <WebChat />
    } 
  ]);

export default function App() {

    const {currentUser} = useContext(AuthContext)

    return (
        <RouterProvider router={router} />
    )
}