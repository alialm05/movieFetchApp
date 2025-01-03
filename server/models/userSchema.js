const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        index: {unique: true},
        lowercase: true
    },
    
    password: { // hash password
        type: String,
        required: true,
    },
    refreshToken: String,
    moviesSaved: [{
        id: String,
        title: String,
        poster_path: String,
        release_date: String,
        vote_average: Number,
    }],

}, {timestamps: true})

userSchema.method({
    async authenticatePass(passwordEntered){
        return await bcrypt.compare(passwordEntered, this.password)
    }

})
userSchema.method({
    async addMovieToSaved(movieToAdd){
        
        if (this.moviesSaved.find(movie => movie.id === movieToAdd.id)){
            console.log("Movie already saved")
            return this.moviesSaved
        }
        this.moviesSaved.push(movieToAdd)
        await this.save()
        return this.moviesSaved
    }
})
userSchema.method({
    async removeMovieFromSaved(movieToRemove){
        this.moviesSaved = this.moviesSaved.filter(movie => movie.id !== movieToRemove.id)
        await this.save()
        return this.moviesSaved
    }
})
userSchema.method({
    async getMovieFromList(movieId){
        const foundMovie = this.moviesSaved.find(movie => movie.id === movieId)
        return foundMovie
    }
})
userSchema.method({
    async setRefreshToken(token){
        this.refreshToken = token
        await this.save()
        return this.refreshToken
    }
})

module.exports = mongoose.model('User', userSchema)