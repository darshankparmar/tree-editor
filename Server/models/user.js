const db = require('../config/db');

class User {
  static async findByUsername(username) {
    try {
      const [users] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  static async findById(userId) {
    try {
      const [users] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async createUser(username, password) {
    try {
      const [result] = await db.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [
        username,
        password,
      ]);
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

module.exports = User;
