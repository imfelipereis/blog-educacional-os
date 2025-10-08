const jwt = require("jsonwebtoken");
const RevokedToken = require("../models/RevokedToken");

const authMiddleware = (rolesPermitidos) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    try {
      // Verifica se o token foi revogado
      const revoked = await RevokedToken.findOne({ token });
      if (revoked) {
        return res.status(401).json({ message: "Token revogado" });
      }

      // Valida JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded);
      
      if (rolesPermitidos && !rolesPermitidos.includes(decoded.role)) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      req.professor = {
        id: decoded.id,
        name: decoded.name || decoded.email,
        email: decoded.email,
        role: decoded.role
      }; 

      console.log("req.professor:", req.professor);
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  };
};

module.exports = authMiddleware;
