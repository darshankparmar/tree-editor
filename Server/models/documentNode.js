const db = require('../config/db');

class DocumentNode {
  static async getAllNodes() {
    try {
      const [nodes] = await db.promise().query('SELECT * FROM document_nodes');
      return nodes;
    } catch (error) {
      console.error('Error getting all nodes:', error);
      throw error;
    }
  }

  static async addNode(parentId, content) {
    try {
      const [result] = await db
        .promise()
        .query('INSERT INTO document_nodes (parent_id, content) VALUES (?, ?)', [parentId, content]);
      return result.insertId;
    } catch (error) {
      console.error('Error adding node:', error);
      throw error;
    }
  }

  static async editNode(nodeId, content) {
    try {
      await db.promise().query('UPDATE document_nodes SET content = ? WHERE node_id = ?', [content, nodeId]);
    } catch (error) {
      console.error('Error editing node:', error);
      throw error;
    }
  }

  static async deleteNode(nodeId) {
    try {
      await db.promise().query('DELETE FROM document_nodes WHERE node_id = ?', [nodeId]);
    } catch (error) {
      console.error('Error deleting node:', error);
      throw error;
    }
  }
}

module.exports = DocumentNode;
