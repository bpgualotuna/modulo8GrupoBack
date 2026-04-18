const express = require("express");
const router = express.Router();
const generoController = require("../controllers/generoController");
const { verificarToken } = require("../middleware/authMiddleware");

router.post("/generos", verificarToken, generoController.crearGenero);

router.get("/generos", verificarToken, generoController.getGeneros);

module.exports = router;
