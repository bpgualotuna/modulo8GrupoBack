const express = require("express");
const router = express.Router();
const contenidoController = require("../controllers/contenidoController");
const { verificarToken } = require("../middleware/authMiddleware");

// IMPORTANTE: La ruta de búsqueda debe ir ANTES de las rutas con :id
router.get("/contenidos/search", contenidoController.buscar);

router.post("/contenidos", verificarToken, contenidoController.crearContenido);

router.get("/contenidos", verificarToken, contenidoController.getContenidos);

router.put("/contenidos/:id", verificarToken, contenidoController.actualizarContenido);

router.delete("/contenidos/:id", verificarToken, contenidoController.eliminarContenido);

module.exports = router;
