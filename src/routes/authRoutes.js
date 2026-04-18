const express = require("express");
const router = express.Router();

const { verificarToken } = require('../middleware/authMiddleware'); 
const authController = require('../controllers/authController');

router.post("/register", authController.registrarUsuario);
router.post("/login", authController.loginUsuario);
router.post("/logout", authController.logoutUsuario);

router.patch('/premium', verificarToken, authController.makePremium);

module.exports = router;
