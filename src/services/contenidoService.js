const contenidoRepository = require("../repositories/contenidoRepository");
const generoRepository = require("../repositories/generoRepository");

async function crearContenido(data) {
    const genero = await generoRepository.obtenerPorId(data.generoId);
    if (!genero) throw new Error("El género especificado no existe");

    return await contenidoRepository.crearContenido(data);
}

async function getContenidos() {
    const contenidos = await contenidoRepository.getContenidos();

    const contenidosConAdvertencia = contenidos.map((contenido) => {
        if (contenido.clasificacion === "R") {
            return {
                ...contenido,
                advertencia: "Este contenido tiene clasificación R: contenido restringido."
            };
        }
        return contenido;
    });

    return contenidosConAdvertencia;
}

async function actualizarContenido(id, data) {
    const contenidoExiste = await contenidoRepository.obtenerPorId(id);
    if (!contenidoExiste) throw new Error("Contenido no encontrado");

    if (data.generoId) {
        const genero = await generoRepository.obtenerPorId(data.generoId);
        if (!genero) throw new Error("El género especificado no existe");
    }

    return await contenidoRepository.actualizarContenido(id, data);
}

async function eliminarContenido(id) {
    const contenidoExiste = await contenidoRepository.obtenerPorId(id);
    if (!contenidoExiste) throw new Error("Contenido no encontrado");

    return await contenidoRepository.eliminarContenido(id);
}

module.exports = { crearContenido, getContenidos, actualizarContenido, eliminarContenido };
