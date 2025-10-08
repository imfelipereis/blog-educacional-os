// backend/src/controllers/homeController.js
const Post = require("../models/Post");

const getHome = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      message: "Bem-vindo à Home!",
      posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao carregar posts" });
  }
};

module.exports = { getHome };
