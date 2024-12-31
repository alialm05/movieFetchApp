const express = require('express')
const Movie = require('../models/moviesSchema')
const moviesSchema = require('../models/moviesSchema')
const router = express.Router()

const {addMovieToList, removeMovieFromList, getMovie, getMovies} = require('../controllers/movieController')

// acount id as param
/*router.get('/:id', (req, res) => {
    res.json({accountid: req.params.id})
})*/

// per user 
router.get('/', getMovies)
//router.get('/:id/movieid', getMovies)
router.post('/', addMovieToList)
router.delete('/', removeMovieFromList/*(req, res) => {
    res.json({
        accountid: req.params.id,
        movieid: req.params.movieid,
        action: "movie-delete-from-list"
    })    
}*/)


module.exports = router