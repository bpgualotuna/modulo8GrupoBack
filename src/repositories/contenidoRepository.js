const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function crearContenido(data) {
    return await prisma.contenido.create({
        data,
        include: { genero: true }
    });
}

async function obtenerPorId(id) {
    return await prisma.contenido.findUnique({
        where: { id },
        include: { genero: true }
    });
}

async function getContenidos() {
    return await prisma.contenido.findMany({
        include: { genero: true }
    });
}

async function actualizarContenido(id, data) {
    return await prisma.contenido.update({
        where: { id },
        data,
        include: { genero: true }
    });
}

async function eliminarContenido(id) {
    return await prisma.contenido.delete({
        where: { id }
    });
}

module.exports = { crearContenido, obtenerPorId, getContenidos, actualizarContenido, eliminarContenido };
