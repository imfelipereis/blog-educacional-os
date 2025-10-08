const express = require("express");
const router = express.Router();
const { registerProfessor, loginProfessor, logoutProfessor } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rotas públicas
router.post("/register", registerProfessor);
router.post("/login", loginProfessor);

// Rota protegida: logout
router.post("/logout", authMiddleware(["admin", "professor"]), logoutProfessor);

module.exports = router;
