const generoRepository = require("../repositories/generoRepository");

async function crearGenero(data) {
    const generoExiste = await generoRepository.obtenerPorNombre(data.nombre);
    if (generoExiste) throw new Error("El género ya existe");

    return await generoRepository.crearGenero(data);
}

async function getGeneros() {
    return await generoRepository.getGenerosConConteo();
}

module.exports = { crearGenero, getGeneros };
