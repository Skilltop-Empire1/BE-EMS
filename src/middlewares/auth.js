const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = async (req,res,next) => {
    const token = req.header("Authorization").split(' ')[1]
    console.log("token",token)
    if(!token) return res.status(404).json("token not found")
        try {
           const decoded = jwt.verify(token,process.env.JWT_TOKEN)
           req.user = decoded
           next()
        } catch (error) {
            res.status(404).json("not authorised")
        }
}

const isAdmin = (req,res,next) => {
    if(req.user.role != "admin"){
        res.status(404).json("access denied")
    }
    next()
}

module.exports = {auth,isAdmin}