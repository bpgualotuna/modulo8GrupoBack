const favoritoRepository = require("../repositories/favoritoRepository");
const contenidoRepository = require("../repositories/contenidoRepository");
const userRepository = require("../repositories/userRepository");

const LIMITE_FAVORITOS_USUARIO = 5;

async function agregarFavorito(usuarioId, contenidoId) {
    
    const contenido = await contenidoRepository.obtenerPorId(contenidoId);
    if (!contenido) {
        throw new Error("El contenido especificado no existe");
    }

    const usuario = await userRepository.findById(usuarioId);
    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const yaExiste = await favoritoRepository.existeFavorito(usuarioId, contenidoId);
    if (yaExiste) {
        throw new Error("Este contenido ya está en tus favoritos");
    }

    if (usuario.rol !== "PREMIUM") {
        const cantidadFavoritos = await favoritoRepository.contarFavoritosPorUsuario(usuarioId);
        if (cantidadFavoritos >= LIMITE_FAVORITOS_USUARIO) {
            throw new Error("Has alcanzado el límite de 5 favoritos. Actualiza a PREMIUM para agregar más.");
        }
    }

    return await favoritoRepository.agregarFavorito(usuarioId, contenidoId);
}

async function obtenerFavoritos(usuarioId) {
    const favoritos = await favoritoRepository.obtenerFavoritosPorUsuario(usuarioId);
    
    return favoritos.map(fav => ({
        id: fav.id,
        contenido: {
            id: fav.contenido.id,
            titulo: fav.contenido.titulo,
            descripcion: fav.contenido.descripcion,
            clasificacion: fav.contenido.clasificacion,
            duracion: fav.contenido.duracion,
            genero: {
                id: fav.contenido.genero.id,
                nombre: fav.contenido.genero.nombre
            }
        },
        agregadoEn: fav.createdAt
    }));
}

async function eliminarFavorito(favoritoId, usuarioId) {
    try {
        return await favoritoRepository.eliminarFavorito(favoritoId, usuarioId);
    } catch (error) {
        throw new Error("Favorito no encontrado o no tienes permiso para eliminarlo");
    }
}

module.exports = {
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito
};
