const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config()
const userRouter = require('./routes/movies-saved');
const authRouter = require('./routes/auth');
const refreshRouter = require('./routes/refresh');

const cors = require('cors');

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ['Authorization']
}

// express app
const app = express();
app.use(express.json())
console.log(process.env.FRONTEND_URL)
app.use(cors(corsOptions))

app.use("/api", authRouter)
app.use("/movies-saved", userRouter)
app.use("/refresh", refreshRouter)

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

