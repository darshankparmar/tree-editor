const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

// Document Operations Routes
router.get('/', documentController.getAllNodes);
router.post('/addNode', authenticationMiddleware, documentController.addNode);
router.put('/editNode/:id', authenticationMiddleware, documentController.editNode);
router.delete('/deleteNode/:id', authenticationMiddleware, documentController.deleteNode);

module.exports = router;
