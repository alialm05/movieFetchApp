const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// verify JWT middleware before making requests (ex. save movie, get movies-saved etc.)
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    //console.log(req.headers.authHeader)
    
    if (!authHeader){
        console.log("No auth header")
        return res.status(401).json({message: "User not authenticated or something went wrong"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, decoded) => {
        if (err){
            console.error(err)
            return res.status(403).json({message: "Token is not valid"})
        }

        // user._id
        req.id = decoded.id
        console.log(decoded.id)
        next()
    })
}

const handleRefreshToken = (req, res) => {

    const cookies = req.cookies
    
    if (!cookies){
        return res.status(401).json({message: "No cookies"})
    }

    const refreshToken = cookies.refreshToken

    if (!refreshToken){
        return res.status(401).json({message: "User not authenticated"})
    }

    try {
        
        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
            const accessToken = jwt.sign({id: decoded.id}, process.env.JWT_SECRET_ACCESS, {expiresIn: "15m"})
            
            /*res.Header("Authorization", accessToken)
            .send(decoded.id)*/
            return res.json({accessToken})

        })

    
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "Invalid Refresh token"})
    }
}

module.exports = {verifyJWT, handleRefreshToken};