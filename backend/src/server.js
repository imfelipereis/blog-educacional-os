// server.js - versão CommonJS
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middlewares/logger");

// Rotas
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes"); // Novas rotas de login
const adminRoutes = require("./routes/adminRoutes");
const postRoutes = require("./routes/postRoutes");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Rotas
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);

// Conexão com MongoDB h
const mongoURL = process.env.MONGO_URL || "mongodb://mongo:27017/blogeducacionaloz";

mongoose.connect(mongoURL)
  .then(() => console.log("✅ Conectado ao MongoDB (container Docker)"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
