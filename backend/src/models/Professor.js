const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subject: { type: String, required: true },
  role: { type: String, enum: ["admin", "professor"], default: "professor" }, // novo campo
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Professor", professorSchema);
