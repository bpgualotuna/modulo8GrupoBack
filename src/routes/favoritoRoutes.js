const express = require("express");
const router = express.Router();
const favoritoController = require("../controllers/favoritoController");
const { verificarToken } = require("../middleware/authMiddleware");

router.post("/favorites", verificarToken, favoritoController.agregarFavorito);

router.get("/favorites", verificarToken, favoritoController.obtenerFavoritos);

router.delete("/favorites/:id", verificarToken, favoritoController.eliminarFavorito);

module.exports = router;
