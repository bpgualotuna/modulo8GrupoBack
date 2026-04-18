const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function agregarFavorito(usuarioId, contenidoId) {
    return await prisma.favorito.create({
        data: {
            usuarioId,
            contenidoId
        },
        include: {
            contenido: {
                include: {
                    genero: true
                }
            }
        }
    });
}

async function obtenerFavoritosPorUsuario(usuarioId) {
    return await prisma.favorito.findMany({
        where: { usuarioId },
        include: {
            contenido: {
                include: {
                    genero: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

async function contarFavoritosPorUsuario(usuarioId) {
    return await prisma.favorito.count({
        where: { usuarioId }
    });
}

async function existeFavorito(usuarioId, contenidoId) {
    const favorito = await prisma.favorito.findUnique({
        where: {
            usuarioId_contenidoId: {
                usuarioId,
                contenidoId
            }
        }
    });
    return favorito !== null;
}

async function eliminarFavorito(id, usuarioId) {
    return await prisma.favorito.delete({
        where: {
            id,
            usuarioId
        }
    });
}

module.exports = {
    agregarFavorito,
    obtenerFavoritosPorUsuario,
    contarFavoritosPorUsuario,
    existeFavorito,
    eliminarFavorito
};
