import Header from "../components/Header"
import Footer from "../components/Footer"
import Card from "../components/Card";

import { useEffect, useState } from "react";

const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY
  }
};

function Genres (){

    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetch(url, options)
        .then(res => res.json())
        .then(json => setGenres(json.genres))

    }, [])


    let components = []
    if (genres){
        genres.map((genre, i) => {   
            components.push(<li key={i}>
                <Card title={genre.name} id={genre.id} cardType = "Genre"
                />
            </li>)
        })
    }


    return (
        <div>
            <Header/>
            <ul className="genre-list">
            {components && components}
            </ul>
            <Footer/>
        </div>

    )

}

export default Genres