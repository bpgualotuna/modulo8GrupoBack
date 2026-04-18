const express = require("express");
const router = express.Router();

const { verificarToken } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

// Endpoint para cambiar a premium
router.post("/users/:id/premium", verificarToken, authController.makePremium);

module.exports = router;
