const express = require('express')
const router = express.Router()

const {addMovieToList, removeMovieFromList, getMovie, getMovies} = require('../controllers/movieController')

// per user 
router.get('/all', getMovies)
router.post('/one', getMovie)
//router.get('/:id/movieid', getMovies)
router.post('/add', addMovieToList)
router.post('/remove', removeMovieFromList)


module.exports = router