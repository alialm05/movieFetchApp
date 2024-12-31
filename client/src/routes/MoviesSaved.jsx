import { set } from "mongoose"
import { useState, useEffect } from "react"

function MoviesSaved(){

    const [movies, setMovies] = useState([])


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getMoviesSaved = async () => {
        
            await fetch(`${import.meta.env.VITE_API_URL}/movies-saved`)
            .then((response) => {

                json = response.json()

                isMounted && setMovies(json.data)
            })
            .catch((error) => {
                console.error(error)
            })
            

            return () => {
                isMounted = false
                controller.abort()
            }
        }

        getMoviesSaved(data)
        
    }, [])

    
    return (
        <div>
            <h1>Movies Saved</h1>



        </div>
    )

}

export default MoviesSaved