import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import useAxiosAuth from "../hooks/useAxiosAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { imgUrl } from "../info/requests.js";
import AuthProvider from "../context/AuthProvider.jsx";

function MoviesSaved(){

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const {auth} =  useContext(AuthProvider)

    const axiosAuth = useAxiosAuth()

    useEffect(() => {
        let isMounted = true
        console.log("movies saved mounted")

        const controller = new AbortController()

        const getMoviesSaved = async () => {
            
            setIsLoading(true)
            
            await axiosAuth.get(`${import.meta.env.VITE_BASE_URL}/movies-saved/all`)
            .then((response) => {
                isMounted && setMovies(response.data.movieList)  
            })
            .catch((error) => {
                console.error(error)
                setError(error) 
            })
            .finally(() => {
                setIsLoading(false)
            })
            
            setIsLoading(false)

            return () => {
                isMounted = false
                controller.abort()
            }
        }

        getMoviesSaved()

    }, [])


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

    return (
        <div>
            <Header excludeTitle={true}/>
        
            {isLoading && <h2> Loading ...</h2>}

            
            {!isLoading && auth.accessToken &&
            
            <ul className="movie-list">
                {components}
            </ul>
            
            ||
            
            !isLoading &&
                <h2 className="flex flex-col items-center mt-10 top-1/3 w-full">
                    <Link to={'/login'}>
                        Please login to view saved movies
                    </Link>     
                </h2>
            
            }

                
        <Footer/>
    </div>
    )

}

export default MoviesSaved