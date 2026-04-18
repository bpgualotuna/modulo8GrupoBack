const favoritoService = require("../services/favoritoService");

async function agregarFavorito(req, res) {
    try {
        const { contenidoId } = req.body;
        const usuarioId = req.user.id;

        if (!contenidoId) {
            return res.status(400).json({ message: "El campo 'contenidoId' es obligatorio" });
        }

        const favorito = await favoritoService.agregarFavorito(usuarioId, contenidoId);
        res.status(201).json({ 
            message: "Contenido agregado a favoritos correctamente", 
            data: favorito 
        });
    } catch (error) {
        if (error.message === "El contenido especificado no existe") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "Este contenido ya está en tus favoritos") {
            return res.status(409).json({ message: error.message });
        }
        if (error.message.includes("límite de 5 favoritos")) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al agregar favorito", error: error.message });
    }
}

async function obtenerFavoritos(req, res) {
    try {
        const usuarioId = req.user.id;
        const favoritos = await favoritoService.obtenerFavoritos(usuarioId);
        res.status(200).json({ 
            message: "Favoritos obtenidos correctamente", 
            data: favoritos 
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener favoritos", error: error.message });
    }
}

async function eliminarFavorito(req, res) {
    try {
        const favoritoId = parseInt(req.params.id);
        const usuarioId = req.user.id;

        if (isNaN(favoritoId)) {
            return res.status(400).json({ message: "El ID no es un número válido" });
        }

        await favoritoService.eliminarFavorito(favoritoId, usuarioId);
        res.status(200).json({ message: "Favorito eliminado correctamente" });
    } catch (error) {
        if (error.message.includes("no encontrado") || error.message.includes("no tienes permiso")) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al eliminar favorito", error: error.message });
    }
}

module.exports = {
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito
};
