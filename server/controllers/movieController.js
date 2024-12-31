const Movie = require('../models/moviesSchema')
const User = require('../models/userSchema')


const getMovies = async  (req, res) => {
    const movies = await Movie.find({}).sort({createdAt: -1})
    const user = await User.findOne({email})

    if (!user){
        return res.status(404).json({error: "no such user"})
    }

    try
    {  
        movies = user.moviesSaved
        res.status(200).json(movies)
        //await user.populate('moviesSaved').execPopulate()
    }
    catch (err) {
        res.status(404).json({error: err})
    }

}

/*const getMovie = async (req, res) => {
    const {email} = req.params
    const movie = await Movie.findById(movieid)
    if (!movie){
        res.status(404).json({error: "no such movie saved"})
    }

}*/

const addMovieToList = async (req, res) =>{
    const {movieId, email} = req.body
    
    const user = await User.findOne({email})

    if (!user){
        return res.status(404).json({error: "no such user"})
    }

    //console.log(req.body)
    try {
        const movieList = await user.addMovieToSaved(movieId)
        //console.log("Added Movie to list")
        return res.status(200).json({movieList})
    }
    catch (err) {
        return res.status(404).json({error: err})
    }
}

const removeMovieFromList = async (req, res) => {
    const {movieid} = req.params
    const movie = await Movie.findByIdAndDelete(movieid)
    if (!movie){
        res.status(404).json({error: "no such movie to delete"})
    }

    res.status(200).json({movie})

}

module.exports = {
    getMovies,
    addMovieToList,
    removeMovieFromList,
}