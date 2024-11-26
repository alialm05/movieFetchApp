
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import movieImg from "../assets/movieplace.png"

const imgUrl = "https://image.tmdb.org/t/p/original/";
const BaseUrl = 'https://api.themoviedb.org/3/movie/';
import options from '../info/requests.js'
console.log(options)

function MoviePage() {

    const {movieid} = useParams()
    const [recommendations, setRecommendations] = useState([])
    const [movie, setMovie] = useState()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)

        const fetchMovie = async () => {
            
            setIsLoading(true);

            try {
                    
            const response = await fetch(
                (BaseUrl+movieid),
                options
            );
            
            const moviesJson = await response.json()
            console.log(moviesJson)   
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
            console.log(recArray)
            
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

        if (movieid){
            fetchMovie()
            fetcRecs()
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
                    
                    <h1 className="stroke-black text-white font-bold my-5">{movie && movie.title || "Movie Not Found"}</h1>
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