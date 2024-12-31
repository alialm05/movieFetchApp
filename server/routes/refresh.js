const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.route('/refresh', (req, res) => {
    
    const refreshToken = req.cookies.refreshToken
    console.log(req)

    if (!refreshToken){
        return res.status(401).json({message: "User not authenticated"})
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
        const accessToken = jwt.sign({id: decoded.id}, process.env.JWT_SECRET, {expiresIn: "15m"})
        
        res.Header("Authorization", accessToken)
        .send(decoded.id)
    
    } catch (error) {
        console.error(error)
        return res.status(400).json({message: "Invalid Refresh token"})
    }

});

module.exports = router;