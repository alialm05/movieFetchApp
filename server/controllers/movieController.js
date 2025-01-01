const User = require('../models/userSchema')


const getMovies = async  (req, res) => {
    const {id} = req
    
    const user = await User.findById({_id: id})
    
    if (!user){
        return res.status(404).json({error: "no such user"})
    }

    console.log("request success by user:", user._id)

    //console.log(req.body)
    try {
        const movieList = user.moviesSaved
        //console.log("Added Movie to list")
        return res.status(200).json({movieList})
    }
    catch (err) {
        return res.status(404).json({error: err})
    }
}

const addMovieToList = async (req, res) =>{
    const {id} = req
    const {movie} = req.body
    
    console.log(req.body)
    
    const user = await User.findById({_id: id})

    if (!user){
        return res.status(404).json({error: "no such user"})
    }
    
    if (!movie){
        return res.status(404).json({error: "no such movie Id"})
    }
    
    //console.log(req.body)
    try {
        const movieList = await user.addMovieToSaved(movie)
        //console.log("Added Movie to list")
        return res.status(200).json({movieList})
    }
    catch (err) {
        return res.status(404).json({error: err})
    }
}

const removeMovieFromList = async (req, res) => {
    const {id} = req
    const {movie} = req.body

    console.log(req.body, "\nmovie : ", movie)

    const user = await User.findById({_id: id})
    
    if (!user){
        return res.status(404).json({error: "no such user"})
    }

    if (!movie){
        return res.status(404).json({error: "no such movie"})
    }

    //console.log(req.body)
    try {
        const movieList = await user.removeMovieFromSaved(movie)
        return res.status(200).json({movieList})
    }
    catch (err) {
        return res.status(404).json({error: err})
    }
}

module.exports = {
    getMovies,
    addMovieToList,
    removeMovieFromList,
}