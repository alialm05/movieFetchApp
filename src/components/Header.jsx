import React from "react";
import { Link } from "react-router-dom";

function NavButton({linkto, text}) {

    return(
        <li className=
        "mx-2 rounded-md px-3 py-2 text-lg font-extrabold hover:bg-gray-700 hover:text-white transition duration-300"
        >
            <Link to={linkto} className=" rounded-md font-bold text-gray-300" >
                {text}
            </Link>
        </li>
    )
}

function Header(props) {
    return(
        <header className=
        "top-0 text-lg font-bold tracking-tight text-white sm:text-2xl items-center">
            
            {!props.excludeTitle && 
            <div>
            <h1>
            Movie Search App
            </h1>

            <nav className="m-4">
                <ul className="top-0 m-0 flex flex-row items-center justify-center">
                    <NavButton linkto={"/popular"} text="Featured"/>
                    <NavButton linkto={"/upcoming"} text="Upcoming"/>
                    <NavButton linkto={"/search"} text="Search"/>
                    <NavButton linkto={"/top_rated"} text="Top Rated"/>
                    <NavButton linkto={"/genres"} text="Genres"/>
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
                    </ul>
                </nav>
                <hr className="opacity-10"></hr>
            </div>

        }

            

            
        </header>
    );
}

export default Header;