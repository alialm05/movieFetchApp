import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Icon } from "react-icons-kit";
import { heart } from "react-icons-kit/icomoon/heart";

import movieImg from "../assets/movieplace.png"

import { imgUrl } from "../info/requests.js";
const BaseUrl = 'https://api.themoviedb.org/3/movie/';
import options from '../info/requests.js'
import useAxiosAuth from "../hooks/useAxiosAuth"
import AuthContext from "../context/AuthProvider.jsx";

function Heart({saved, updateMovieList}){

    let heartColor = saved === true ? 'red' : 'grey'
    
    //console.log(heartColor)
    
    /*useEffect(() => {
        console.log("Saved: ", saved)
    }, [])*/

    return (
        <div className="right-0 px-3">

            <button 
            style={{ color: heartColor}}
            onClick={() => {
                updateMovieList()
                }}
            className="flex-col right-0 items-center justify-center font-bold mt-5 mr-0 rounded-full">
                <Icon size={32} icon={heart}/>
            </button>
        </div>
    )
}

function MoviePage() {
    
    const {movieid} = useParams()
    const [recommendations, setRecommendations] = useState([])
    const [movie, setMovie] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false)
    const [saveDebounce, setSaveDebounce] = useState(false)
    
    const {auth} = useContext(AuthContext)
    const axiosAuth = useAxiosAuth()
    
    
    const updateMovieList = async () => {
        
        if (saveDebounce || !auth.accessToken){
            return
        }
        setSaveDebounce(true)
        console.log("toggling Movie save")

        const movieToSend = {
            id: movieid,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average
        }
        
        if (!saved){
            setSaved(true)
            
            await axiosAuth.post(`/movies-saved/add`, {movie: movieToSend})
                .then((response) => {
                    //console.log(response)
                    //console.log("Movie Saved")
                })
                .catch((error) => {
                    console.error(error)
                    //setSaved(false)
                }).finally(() => {
                    setTimeout(() =>{setSaveDebounce(false)}, 1000)
                })

        }
        else {
            setSaved(false)
            //console.log("Removing Movie: ", movieToSend)
            await axiosAuth.post(`/movies-saved/remove`, {movie: movieToSend})
                .then((response) => {
                    //console.log(response)
                })
                .catch((error) => {
                    //console.error(error)
                    //setSaved(true)
                })
                .finally(() =>{
                    setTimeout(() =>{setSaveDebounce(false)}, 1000)
                })
                //console.log("Movie Removed")
        } 
    }

    useEffect(() => {
        
        console.log("Movie Page Mounted")
        let isMounted = true
        const controller = new AbortController()

        window.scrollTo(0, 0)

        
        const fetchMovie = async () => {
            
            setIsLoading(true);
        
            try {
                    
            const response = await fetch(
                (BaseUrl+movieid),
                options
            );
            
            const moviesJson = await response.json()
            //console.log(moviesJson)   
            setMovie(moviesJson)
            
            }
            catch (e) {
                console.log(e)
            } finally { 
                setIsLoading(false);
            }
        
            setIsLoading(false);
        
        }
        

        const fetcRecs = async () => {

            try {

            const response = await fetch(
                (BaseUrl+movieid + "/recommendations"),
                options
            );
            
            const recArray = await response.json()
            //console.log(recArray)
            
            if (recArray){
                if (recArray.results){
                    setRecommendations((recArray.results.slice(0,5)))
                }
            }
            
        }
            catch (e) {
                console.log(e)
            }
        }

        const isMovieSaved = async () => {
            console.log("Checking if movie is saved")
            await axiosAuth.post(`/movies-saved/one`, {movieId: movieid})
                .then((response) => {
                    if (response.data.movie){
                        isMounted && setSaved(true)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    //setSaved(false)
                })

    }

        if (movieid){
            fetchMovie({setIsLoading, setMovie, movieid})
            fetcRecs()
            isMovieSaved()
        }

        return () => {
            isMounted = false
            controller.abort()
        }

    }, [movieid])

    if (isLoading){
        return <h2>Loading</h2>
    }



    if (!movie || !movieid){
        return <div>Movie Not Found</div>
    }

    let recComponents = []
    if (movie && movieid && recommendations.length > 0){
        recommendations.map((movie, i) => {   
            recComponents.push(<li key={i}>
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
        <div className="movie-page">
           {<Header excludeTitle={true}/>}
           {(movie && movieid) && 
            <div>

                <div style={{'--image-url': `url(${movie.backdrop_path && imgUrl+movie.backdrop_path || imgUrl+movie.poster_path || movieImg})`}} className=
                "bg-center bg-no-repeat bg-[image:var(--image-url)] w-screen opacity-50 border-black border-8 h-96">

                    <div className="backdrop-blur-sm h-full bottom-0">
                        <div className=
                        "flex flex-col ml-10 bottom-0 py-2 max-h-60 items-center border-black rounded-lg">
                            
                        <img className="max-h-80 rounded-md border-black" src={movie.poster_path && imgUrl+movie.poster_path || imgUrl+movie.poster_path || movieImg}/>

                        </div>
                    </div>


                </div>                


                <section className="font-medium my-5">
                    
                    <div className="flex flex-row items-center justify-center">

                        <h1 className="stroke-black text-white font-bold my-5 justify-center items-center">{movie && movie.title || "Movie Not Found"}</h1>
                        <Heart updateMovieList={updateMovieList} saved={saved}/>
                        
                    </div>
                    
                    <p className="flex items-start justify-center opacity-30 font-normal">
                        {(movie && movie.tagline) &&  `\"${movie.tagline}\"` || ""}</p>
                    
                    <div className="flex flex-col items-center justify-center text-center text-white mx-64 my-8 ">
                    {movie && movie.overview || "Movie Description not Available"}
                    </div>

                    <ul className="flex flex-wrap flex-row items-center text-white justify-center my-16 mx-20">
                        
                        <div className=
                        "flex flex-col items-center justify-center text-center mx-32 my-6">
                            <label className="opacity-50">Voting Average:</label>
                        {movie && "⭐" + (Math.floor(movie.vote_average*10)/10) +"/10" || "Movie Description not Available"}
                        </div>
                        
                        <div className=
                        "flex flex-col items-center justify-center text-center mx-32 my-6">
                            <label className="opacity-50" >Release Date:</label>
                        {movie && movie.release_date || "Movie Description not Available"}
                        </div>

                        <div className=
                        "flex flex-col items-center justify-center text-center mx-32 my-6">
                            <label className="opacity-50" >Runtime:</label>
                        {movie && (Math.floor(movie.runtime/60) + " h " + ((movie.runtime % 60 > 0) && (movie.runtime % 60)  + " m" || ""))
                            || "Movie Description not Available"}
                        </div>
                        
                        <div className="flex flex-col items-center justify-center text-center mx-32 my-6">
                            <label className="opacity-50" >Genres:</label>

                            <ul className="flex flex-row flex-wrap text-wrap items-center justify-center my-3">
                                {movie.genres &&
                                    movie.genres.map((genre, id) => {
                                        return <li key={id} className="font-medium mx-1 text-sm text-gray-600 text-ellipsis overflow-hidden">
                                            {genre.name + ','}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>


                    </ul>

                </section>  

                

                
                <section className="font-medium my-20">

                    <label className="opacity-80 flex items-center justify-center text-white mt-5 mb-20 text-4xl ">Recommendations</label>


                    <ul className="flex flex-row items-center justify-center my-3">
                            {recComponents.length > 0 && recComponents}
                    </ul>
  

                </section>

            </div>
           }
           
           </div>
    )

}

export default MoviePage