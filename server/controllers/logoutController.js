const User = require('../models/userSchema')

const handleLogout = async (req, res) => {

    const cookies = req.cookies
    if (!cookies){
        return res.status(401).json({message: "No cookies"})
    }

    const refreshToken = cookies.refreshToken

    if (!refreshToken){
        return res.status(401).json({message: "User not authenticated"})
    }

    const foundUser = await User.findOne({refreshToken})

    if (!foundUser){
        return res.status(404).json({message: "User not found"})
    }

    res.clearCookie('refreshToken', {httpOnly: true})
    foundUser.refreshToken = ""
    foundUser.save()

    return res.status(200).json({message: "Logged out successfully"})

}

module.exports = handleLogout;