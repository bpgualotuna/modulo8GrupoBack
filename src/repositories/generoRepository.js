const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function crearGenero(data) {
    return await prisma.genero.create({ data });
}

async function obtenerPorNombre(nombre) {
    return await prisma.genero.findUnique({ where: { nombre } });
}

async function obtenerPorId(id) {
    return await prisma.genero.findUnique({ where: { id } });
}

async function getGenerosConConteo() {
    return await prisma.genero.findMany({
        include: {
            _count: {
                select: { contenidos: true }
            }
        }
    });
}

module.exports = { crearGenero, obtenerPorNombre, obtenerPorId, getGenerosConConteo };
