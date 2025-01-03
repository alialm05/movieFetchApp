const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require("dotenv").config()
const {verifyJWT, handleRefreshToken}  = require('./controllers/JWT')
const handleLogout = require('./controllers/logoutController')
const moviesRouter = require('./routes/movies-saved');
const authRouter = require('./routes/auth');

const cors = require('cors');

const corsOptions = {
    origin: [process.env.FRONTEND_URL_DEV, process.env.FRONTEND_URL_PREV, process.env.FRONTEND_URL_PRODUCTION],
    credentials: true,
    exposedHeaders: ['Authorization']
}

// express app
const app = express();
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser()) // middleware for cookies

app.use("/api", authRouter)
app.get("/refresh", handleRefreshToken) // requests new acces token
app.get("/logout", handleLogout) // handle logout

app.use(verifyJWT)
app.use("/movies-saved", moviesRouter)


app.all('*', (req, res) => {
    res.status(404).json({message: "Route not found"})
})

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
                
        // listend for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to mongo db and Server is running on port ' + process.env.PORT);
        })
        
    })
    .catch((err) => {console.error(err)})

