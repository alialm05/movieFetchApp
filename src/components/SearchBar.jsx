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
        <div className="flex flex-col items-center justify-center">
            <div className=
            "flex flex-row items-center justify-center bg-white w-4/6 rounded-full px-5 my-3 mb-10">
            
            
                <FaSearch id="search-icon" />
                <input className=
                "block w-full h-full rounded-md border-0 py-3 pl-7 pr-20 text-gray-600 md:text-sm md:leading-6"
                placeholder="Type to search ..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)} />
            </div>
        </div>
        
    )
}

export default SearchBar