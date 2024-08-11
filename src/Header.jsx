import React from "react";
import { Link } from "react-router-dom";
function Header() {
    return(
        <header className="header">
            <h1>
            Movie Search App
            </h1>
            <nav>
                <ul className="navList">
                    <li>
                        <Link to="/popular">Featured</Link>
                    </li>
                    <li>
                        <Link to="/">Upcoming Movies</Link>
                    </li>
                    
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/top_rated">Top Rated</Link>
                    </li>
                    
                    <li>
                        <Link to="/genre_select">Genres</Link>
                    </li>
                </ul>
            </nav>
            <hr></hr>
            
        </header>
    );
}

export default Header;