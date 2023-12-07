const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Document Operations Logic
router.get('/', async (req, res) => {
  try {
    // Retrieve and send the document structure
    const [documentNodes] = await db.promise().query('SELECT * FROM document_nodes');
    res.json(documentNodes);
  } catch (error) {
    console.error('Error retrieving document structure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addNode', async (req, res) => {
  try {
    const { parentId, content } = req.body;

    // Add a new node to the document structure
    const [result] = await db
      .promise()
      .query('INSERT INTO document_nodes (parent_id, content) VALUES (?, ?)', [parentId, content]);

    res.status(201).json({ message: 'Node added successfully', nodeId: result.insertId });
  } catch (error) {
    console.error('Error adding node:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/editNode/:id', async (req, res) => {
  try {
    const nodeId = req.params.id;
    const { content } = req.body;

    // Edit the content of a specific node
    await db.promise().query('UPDATE document_nodes SET content = ? WHERE node_id = ?', [content, nodeId]);

    res.json({ message: 'Node edited successfully' });
  } catch (error) {
    console.error('Error editing node:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteNode/:id', async (req, res) => {
  try {
    const nodeId = req.params.id;

    // Delete a specific node from the document structure
    await db.promise().query('DELETE FROM document_nodes WHERE node_id = ?', [nodeId]);

    res.json({ message: 'Node deleted successfully' });
  } catch (error) {
    console.error('Error deleting node:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
