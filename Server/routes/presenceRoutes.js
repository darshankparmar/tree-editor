const express = require('express');
const router = express.Router();
const presenceController = require('../controllers/presenceController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// User Presence Routes
router.get('/', presenceController.getAllUsers);
router.post('/join', authenticationMiddleware, presenceController.join);
router.post('/leave', authenticationMiddleware, presenceController.leave);

module.exports = router;
