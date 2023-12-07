const express = require('express');
const router = express.Router();
const db = require('../config/db');

// User Presence Logic
router.get('/', async (req, res) => {
  try {
    // Retrieve and send user presence information
    const [userPresence] = await db.promise().query('SELECT * FROM user_presence');
    res.json(userPresence);
  } catch (error) {
    console.error('Error retrieving user presence:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { userId } = req.body;

    // Add a user to the user presence table
    await db.promise().query('INSERT INTO user_presence (user_id) VALUES (?)', [userId]);

    res.status(201).json({ message: 'User joined successfully' });
  } catch (error) {
    console.error('Error joining user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/leave', async (req, res) => {
  try {
    const { userId } = req.body;

    // Remove a user from the user presence table
    await db.promise().query('DELETE FROM user_presence WHERE user_id = ?', [userId]);

    res.json({ message: 'User left successfully' });
  } catch (error) {
    console.error('Error leaving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
