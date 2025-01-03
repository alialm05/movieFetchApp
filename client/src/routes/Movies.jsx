import { useEffect, useRef, useState } from "react";
import Card from "../components/Card"
import propTypes from 'prop-types';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const imgUrl = "https://image.tmdb.org/t/p/original/"
const BaseUrl = 'https://api.themoviedb.org/3/movie/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY
  }
};

function Movies(props = defaultProps){

    /*const { queryType } = useParams();
    console.log(queryType)*/

    const [genre, setGenre] = useState("Action");
    const [QueryType, setQueryType] = useState(props.queryType);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    

    const abortControllerRef = useRef (null);

    const updateGenre = (e) => {
        setGenre(e.target.textContent);
    }

    //console.log("changed to " + props.queryType)
        
    if (QueryType != props.queryType){
        console.log("changed to " + props.queryType)
        setQueryType(q => q = props.queryType)
    }

    // -- Fetch Movies, Change Page, Change Qury Type
    useEffect(() => {
        
        console.log("movies mounted")

        const fetchMovies = async () => {
            
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            //options.signal = abortControllerRef.current?.signal
            try {

                const response = await fetch(
                    (BaseUrl + '/' + QueryType + '?language=en-US&page=' + page),
                    options,
                    {signal: abortControllerRef.current?.signal,});
                
                const moviesJson = await response.json()    
                setMovies(moviesJson.results)
            }
            catch (e) {
                if (e.name === "AbortError") {
                    console.log("Aborted")
                    return;
                }
                setError(e);        
            } 
            finally {
                setIsLoading(false);
            }

            
            setIsLoading(false)
        }

        fetchMovies();
    }, [genre, page, QueryType])



    // -- HANDLE PAGE CHANGE
    const TogglePage = (pg) => {
        if(pg >= 1) {
            console.log("Page = ", pg)
            setPage(pg);
        }
    }

     // -- Map Movies fetched
    let components = []
    if (movies){
        movies.map((movie, i) => {   
            components.push(<li key={i}>
                <Card title={movie.title} desc={movie.overview}
                img={movie.poster_path && imgUrl+movie.poster_path || null} 
                rating = {movie.vote_average}
                releaseYear={movie.release_date? movie.release_date.substring(0,4) : ""}
                id = {movie.id}
                />
            </li>)
        })
    }
    

    
    if (error) {
        return <div>Something went wrong, please try again</div>
    }


    return(
        <div>
            <Header/>

            {isLoading && <h2> Loading ...</h2>}
            {!isLoading && 
            <ul className="movie-list">
                {components}
            </ul>
            }


            <div className="page-toggle">
                <button 
                className=
                "text-white bg-zinc-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-zinc-600-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => TogglePage(page - 1)}
                >
                    back
                </button>
            
                <button 
                className=
                "text-white bg-zinc-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-zinc-600-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-zinc-900 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => TogglePage(page + 1)}
                >
                    next
                </button>
            </div>
            
            <Footer/>
        </div>
        
    )

}

const defaultProps = {
    movieList: []
}

Movies.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    img: propTypes.string
}

export default Movies