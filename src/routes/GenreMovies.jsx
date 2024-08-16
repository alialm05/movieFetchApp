import { useEffect, useRef, useState } from "react";
import Card from "../components/Card"
import propTypes from 'prop-types';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const imgUrl = "https://image.tmdb.org/t/p/original/"
const BaseUrl = 'https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY
  }
};

function GenreMovies(props = defaultProps){

    const {genreid} = useParams();

    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    

    const abortControllerRef = useRef (null);

    //console.log("changed to " + props.queryType)

    // -- Fetch Movies, Change Page, Change Qury Type
    useEffect(() => {
        //console.log(props.queryType, QueryType)

        const fetchMovies = async () => {
            
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            //options.signal = abortControllerRef.current?.signal
            try {

                const response = await fetch(
                    (BaseUrl+ '&language=en-US&page=' + page + '&with_genres=' + (genreid || 28)),
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
    }, [page, genreid])



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
                id = {movie.id}/>
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
                className="back"
                onClick={() => TogglePage(page - 1)}
                >
                    back
                </button>
            
                <button 
                className="next"
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

GenreMovies.propTypes = {
    title: propTypes.string,
    desc: propTypes.string,
    img: propTypes.string
}

export default GenreMovies