// src/routes/postRoutes.js
const express = require('express');
const { getPostById } = require('../controllers/postController.js');

const router = express.Router();

// GET /api/posts/:id
router.get('/:id', getPostById);

module.exports = router;