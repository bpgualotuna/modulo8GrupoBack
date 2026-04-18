const contenidoService = require("../services/contenidoService");

async function crearContenido(req, res) {
    try {
        const { titulo, generoId } = req.body;
        if (!titulo || !generoId) {
            return res.status(400).json({ message: "Los campos 'titulo' y 'generoId' son obligatorios" });
        }
        const contenido = await contenidoService.crearContenido(req.body);
        res.status(201).json({ message: "Contenido creado correctamente", data: contenido });
    } catch (error) {
        if (error.message === "El género especificado no existe") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al crear el contenido", error: error.message });
    }
}

async function getContenidos(req, res) {
    try {
        const contenidos = await contenidoService.getContenidos();
        res.status(200).json({ message: "Contenidos obtenidos correctamente", data: contenidos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los contenidos", error: error.message });
    }
}

async function actualizarContenido(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "El ID no es un número válido" });
        }
        const contenido = await contenidoService.actualizarContenido(id, req.body);
        res.status(200).json({ message: "Contenido actualizado correctamente", data: contenido });
    } catch (error) {
        if (error.message === "Contenido no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "El género especificado no existe") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al actualizar el contenido", error: error.message });
    }
}

async function eliminarContenido(req, res) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "El ID no es un número válido" });
        }
        const contenido = await contenidoService.eliminarContenido(id);
        res.status(200).json({ message: "Contenido eliminado correctamente", data: contenido });
    } catch (error) {
        if (error.message === "Contenido no encontrado") {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al eliminar el contenido", error: error.message });
    }
}

module.exports = { crearContenido, getContenidos, actualizarContenido, eliminarContenido };
