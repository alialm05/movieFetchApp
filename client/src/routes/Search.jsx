import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResultList";

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
                id={movie.id}
                />

            </li>)
        })    
    }
    
    // Search Bar component will handle result state change

    return (
        <div className="w-screen items-center justify-center">
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