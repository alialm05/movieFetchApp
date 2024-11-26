import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Login(){

    const [userInput, setUserInput] = useState("");
    const [passInput, setPassInput] = useState("");

    function handleUsernameChange(val){
        setUserInput(val)
    }

    function handlePasswordChange(val){
        let length = val.length;
        let pass = ""
        //console.log(val, length)
        
        for (let i = 0; i<length; i++) {
            pass += "•"
            //console.log(pass)
        }
        setPassInput(pass);
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
                    value={userInput} 
                    onChange={(e) => handleUsernameChange(e.target.value)} />

                </div>


                <div className=
                "flex flex-row items-center justify-center bg-white w-1/3 rounded-full px-5 my-3 mb-10">


                    <input className=
                    "block w-full h-full rounded-md border-0 py-3 pl-1 pr-10 text-gray-600 md:text-lg md:leading-6"
                    placeholder="Password" 
                    value={passInput} 
                    onChange={(e) => handlePasswordChange(e.target.value)} />

                </div>

                <button className=
                "flex flex-row items-center justify-center bg-violet-900 stroke-violet-950 w-fit rounded-full px-5 my-3 mb-10">
                    Login
                </button>

            </div>

            <Footer/>

        </div>


    )
}

export default Login