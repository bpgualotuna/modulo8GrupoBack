const generoService = require("../services/generoService");

async function crearGenero(req, res) {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: "El campo 'nombre' es obligatorio" });
        }
        const genero = await generoService.crearGenero({ nombre });
        res.status(201).json({ message: "Género creado correctamente", data: genero });
    } catch (error) {
        if (error.message === "El género ya existe") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Error al crear el género", error: error.message });
    }
}

async function getGeneros(req, res) {
    try {
        const generos = await generoService.getGeneros();
        res.status(200).json({ message: "Géneros obtenidos correctamente", data: generos });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los géneros", error: error.message });
    }
}

module.exports = { crearGenero, getGeneros };
