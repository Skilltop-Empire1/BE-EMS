// middleware/auth.js
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET; 

exports.authenticateJWT = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)

    if (!token) {
        return res.status(403).json({ error: 'Login first to access this resource' });
    }

    const decoded = jwt.verify(token, SECRET_KEY)
        req.user = await User.findByPk(decoded.id)
       
        next();
        };



