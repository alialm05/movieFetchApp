import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PasswordFeild from "../components/PasswordFeild";
import AuthContext from "../context/AuthProvider";

const SIGNIN_URL = '/api/signin'

function Login(){

    const {setAuth} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            `${import.meta.env.VITE_BASE_URL + SIGNIN_URL}`,
            {password, email},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        )
        .then(response => {
            if (response.status === 200){
                const accessToken = response.data?.token;
                setAuth({email, password, accessToken});
                console.log(accessToken)
                setErrorMsg("")
                navigate('/popular')
            }
        })
        .catch(error => {
            console.log(error)
            setErrorMsg(error.message)
        })

    }


    return (
        <div>
            
            <Header/>

            <div className="w-screen flex flex-col items-center justify-center mt-10 mb-10">
            
                <h1 className="text-4xl text-center font-bold">Login</h1>

                <div className=
                "flex flex-row items-center justify-center bg-white w-1/3 rounded-full px-5 my-3 mb-10">


                    <input className=
                    "block w-full h-full rounded-md border-0 py-3 pl-1 pr-10 text-gray-600 md:text-lg md:leading-6"
                    placeholder="Username" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                </div>

                <PasswordFeild password={password} setPassword={setPassword} />


                <p className="flex flex-row items-center justify-center text-red-400"> 
                    {errorMsg}
                </p>

                <p className="flex flex-row items-center justify-center underline"> 
                    <Link to={"/signup"}>
                        Don't have an account? Sign up
                    </Link>
                </p>
                

                <button className=
                "flex flex-row items-center justify-center bg-violet-900 stroke-violet-950 w-fit rounded-full px-5 my-3 mb-10"
                onClick={handleSubmit}
                >
                    Login
                </button>

            </div>

            <Footer/>

        </div>


    )
}

export default Login