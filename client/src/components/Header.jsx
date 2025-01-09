import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";

function NavButton({linkto, text, action}) {

    return(
        <li className=
        "mx-2 rounded-md px-3 py-2 text-lg font-extrabold hover:bg-gray-700 hover:text-white transition duration-300"
        >
            

            <Link to={linkto} className=" rounded-md font-bold text-gray-300" >
                {action && 
                <button onClick={action} className="bg-transparent">
                    {text}
                </button> ||
                text
                }
            </Link>
        </li>
    )
}

function Header(props) {

    const {auth, setAuth} = useContext(AuthContext);

    const logout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
                withCredentials: true
            })
            .then(() => {
                console.log("logged out")
                setAuth({})
            })
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <header className=
        "top-0 text-lg font-bold tracking-tight text-white sm:text-2xl items-center w-screen">
            
            {!props.excludeTitle && 
            <div>
            <h1 className="text-6xl text-center font-bold pt-3">
            Movies 2 Watch 🍿
            </h1>

            <nav className="m-4">
                <ul className="top-0 m-0 flex flex-row items-center justify-center">
                    <NavButton linkto={"/popular"} text="Featured"/>
                    <NavButton linkto={"/upcoming"} text="Upcoming"/>
                    <NavButton linkto={"/search"} text="Search"/>
                    <NavButton linkto={"/top_rated"} text="Top Rated"/>
                    <NavButton linkto={"/genres"} text="Genres"/>
                    <NavButton linkto={"/movies_saved"} text="Movies Saved"/>
                    
                    {!auth.accessToken && <NavButton linkto={"/login"} text="Login/Signup"/> || <NavButton linkto={"/"} text="Logout" action={logout}/>}
                
                </ul>
            </nav>
            <hr className="opacity-10 mb-10"></hr>
            
        </div>
        
        ||
            <div>
                
                <nav className="mb-0">
                    <ul className="top-0 m-0 flex flex-row items-center justify-center">
                        <NavButton linkto={"/popular"} text="Featured"/>
                        <NavButton linkto={"/search"} text="Search"/>
                        <NavButton linkto={"/top_rated"} text="Top Rated"/>
                        <NavButton linkto={"/genres"} text="Genres"/>
                   
                        <NavButton linkto={"/movies_saved"} text="Movies Saved"/>
                        {!auth.accessToken && <NavButton linkto={"/login"} text="Login/Signup"/>}
                    </ul>
                </nav>
                <hr className="opacity-10"></hr>
            </div>

        }

            

            
        </header>
    );
}

export default Header;