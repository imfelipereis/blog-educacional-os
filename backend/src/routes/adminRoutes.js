const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminController = require("../controllers/adminController");

// Rota protegida
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: `Bem-vindo ao painel administrativo, professor ${req.professor.email}!`,
  });
});

router.post("/posts", authMiddleware(["admin", "professor"]), adminController.createPost);
router.get("/posts", authMiddleware(["admin", "professor"]), adminController.getPosts);
router.put("/posts/:id", authMiddleware(["admin", "professor"]), adminController.updatePost);
router.delete("/posts/:id", authMiddleware(["admin", "professor"]), adminController.deletePost);

module.exports = router;
