const RevokedToken = require("../models/RevokedToken");
const Professor = require("../models/Professor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerProfessor = async (req, res) => {
  try {
    const { name, email, password, subject, role = "professor" } = req.body;

    // Verifica se já existe professor com o mesmo email
    const existing = await Professor.findOne({ email });
    if (existing) return res.status(400).json({ message: "E-mail já cadastrado" });

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const professor = new Professor({
      name,
      email,
      password: hashedPassword,
      subject,
      role
    });

    await professor.save();

    res.status(201).json({ message: "Professor registrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao registrar professor", error: err.message });
  }
};

const loginProfessor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const professor = await Professor.findOne({ email });
    if (!professor) return res.status(400).json({ message: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(password, professor.password);
    if (!isMatch) return res.status(400).json({ message: "Credenciais inválidas" });

    // Gerar token JWT
    const token = jwt.sign(
      { id: professor._id, name: professor.name, email: professor.email, role: professor.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, professor: { name: professor.name, email: professor.email, subject: professor.subject, role: professor.role } });
  } catch (err) {
    res.status(500).json({ message: "Erro ao realizar login", error: err.message });
  }
};

const logoutProfessor = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({ message: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    await RevokedToken.create({ token });
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao realizar logout", error: err.message });
  }
};

module.exports = { registerProfessor, loginProfessor, logoutProfessor };
