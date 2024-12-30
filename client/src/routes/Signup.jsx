import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PasswordFeild from "../components/PasswordFeild";

const SIGNUP_URL = '/api/register'

function SignUp(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();


    const handleSignup = async () => {

        await axios.post(`${import.meta.env.VITE_BASE_URL + SIGNUP_URL}`, {password, email})
        .then(response => {
            console.log(response)
            if (response.status === 201){
                console.log(response.data)
                navigate('/login')
                setErrorMsg('')
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
            
                <h1 className="text-4xl text-center font-bold">Sign Up</h1>

                <div className=
                "flex flex-row items-center justify-center bg-white w-1/3 rounded-full px-5 my-3 mb-10">


                    <input className=
                    "block w-full h-full rounded-md border-0 py-3 pl-1 pr-10 text-gray-600 md:text-lg md:leading-6"
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                </div>

                <PasswordFeild password={password} setPassword={setPassword} />

                <p className="flex flex-row items-center justify-center text-red-400"> 
                    {errorMsg}
                </p>

                <p className="flex flex-row items-center justify-center underline"> 
                    <Link to={"/login"}>
                        Already have an account? Log in
                    </Link>
                </p>

                <button className=
                "flex flex-row items-center justify-center bg-violet-900 stroke-violet-950 w-fit rounded-full px-5 my-3 mb-10"
                onClick={handleSignup}>
                    Sign Up
                </button>

            </div>

            <Footer/>

        </div>


    )
}

export default SignUp