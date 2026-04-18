const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");
const { verificarToken } = require("../middleware/authMiddleware");

router.post("/contenidos", verificarToken, contenidoController.crearContenido);

router.get("/contenidos", verificarToken, contenidoController.getContenidos);

router.put("/contenidos/:id", verificarToken, contenidoController.actualizarContenido);

router.delete("/contenidos/:id", verificarToken, contenidoController.eliminarContenido);

module.exports = router;
