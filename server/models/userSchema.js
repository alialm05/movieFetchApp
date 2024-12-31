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

    moviesSaved: [String],

}, {timestamps: true})

userSchema.method({
    async authenticatePass(passwordEntered){
        return await bcrypt.compare(passwordEntered, this.password)
    }

})
userSchema.method({
    async addMovieToSaved(movieId){
        this.moviesSaved.push(movieId)
        await this.save()
        return this.moviesSaved
    }
})

module.exports = mongoose.model('User', userSchema)