// backend/routes/homeRoutes.js
const express = require("express");
const router = express.Router();
const { getHome } = require("../controllers/homeController");

// Rota GET para a Home
router.get("/", getHome);

module.exports = router;