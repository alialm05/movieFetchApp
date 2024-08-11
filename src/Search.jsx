import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Card from "./Card";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResultList";

const imgUrl = "https://image.tmdb.org/t/p/original/"
const BaseUrl = 'https://api.themoviedb.org/3/search/movie';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY
  }
};

function Search(){

    const [results, setResults] = useState([]);
    const [movies, setMovies] = useState([]);

    const fetchMovie = (id) => {

    }

    let components = []
    if (results){
        results.map((movie, i) => { 
            components.push(<li key={i}>
                <Card title={movie.title}
                img={movie.poster_path && imgUrl+movie.poster_path || null} 
                rating = {movie.vote_average}
                releaseYear={movie.release_date? movie.release_date.substring(0,4) : ""}
                />

            </li>)
        })    
    }
    
    // Search Bar component will handle result state change

    return (
        <div>
            <Header/>
            
            <SearchBar setResults={setResults}/>
            
            <ul className="search-bar-container"> 
                {/*<SearchResult results = {results}></SearchResult>*/}
                {
                    results && components
                }
            </ul>

            <Footer/>
        </div>
    )
}

export default Search;