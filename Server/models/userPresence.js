const db = require('../config/db');

class UserPresence {
  static async getAllUsers() {
    try {
      const [users] = await db.promise().query('SELECT * FROM user_presence');
      return users;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  }

  static async addUser(userId) {
    try {
      await db.promise().query('INSERT INTO user_presence (user_id) VALUES (?)', [userId]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  static async removeUser(userId) {
    try {
      await db.promise().query('DELETE FROM user_presence WHERE user_id = ?', [userId]);
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  }
}

module.exports = UserPresence;
