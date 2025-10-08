// src/controllers/postController.js
const Post = require('../models/Post');

// Buscar um post pelo ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar post.' });
  }
};

module.exports = { getPostById };
