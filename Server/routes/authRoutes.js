const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// User Authentication Routes
//router.post('/login', authController.login);
//router.post('/register', authController.register);

// Protected route example
// router.get('/protected', authenticationMiddleware, (req, res) => {
//   res.json({ message: 'This is a protected route', user: { userId: req.userId, username: req.username } });
// });

module.exports = router;
