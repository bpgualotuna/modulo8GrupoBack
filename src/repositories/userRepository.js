const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function crearUsuario(data) {
    return await prisma.usuario.create({ data });
}

async function obtenerPorEmail(email) {
    return await prisma.usuario.findUnique({ where: { email } });
}

async function findById(id) {
    return await prisma.usuario.findUnique({ where: { id } });
}

async function cambiarAPremium(id) {
    return await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: { rol: "PREMIUM" }
    });
}

module.exports = { crearUsuario, obtenerPorEmail, findById, cambiarAPremium };
