import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import "./search-bar.css"
import Card from "./Card";

const BaseUrl = 'https://api.themoviedb.org/3/search/movie';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_API_KEY
  }
};


function SearchBar ({setResults}) {

    const [input, setInput] = useState("");

    const fetchData = (inputKeyWord) => {
        
        fetch(`${BaseUrl}?query=${inputKeyWord}&page=1`, options)
        .then((response) => response.json())
        .then(json => {
            console.log(json)
            setResults(json.results) // HANDLE RESULTS STATE CHANGE for parent compoenent (Search)
        })
    }

    const handleChange = (val) => {
        
        setInput(val);

        if (val.trim() != ""){
            fetchData(val);
        }
        else {
            setResults([]) // HANDLE RESULTS STATE CHANGE for parent compoenent (Search)
        }
    }

  
    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Type to search ..." 
            value={input} 
            onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
}

export default SearchBar