const express = require("express");
const router = express.Router();

// IMPORTANTE: Asegúrate de que esta línea tenga las LLAVES { }
const { verificarToken } = require('../middleware/authMiddleware'); 
const authController = require('../controllers/authController');

router.post("/register", authController.registrarUsuario);
router.post("/login", authController.loginUsuario);
router.post("/logout", authController.logoutUsuario);

// Aquí usamos 'verificarToken' que ya es una función válida
router.patch('/premium', verificarToken, authController.makePremium);

module.exports = router;
