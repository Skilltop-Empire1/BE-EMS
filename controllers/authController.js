// // routes/auth.js
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const SECRET_KEY = process.env.JWT_SECRET;


// // Register a new user
// exports.register = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         Create a new user in the database
//         const user = await User.create({ username, password: hashedPassword });

//         // Generate a token for the new user
//         const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

//         // Set the token in a cookie
//         res.cookie('token', token, {
//             httpOnly: true, // Ensures the cookie is not accessible via JavaScript
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 3600000
//         });

//         res.status(201).json({ message: 'User registered successfully', user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



// // Login user
// exports.login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid username or password' });
//         }
//         const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });


//         // Set the token in a cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 3600000 
//         });

//         res.json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

