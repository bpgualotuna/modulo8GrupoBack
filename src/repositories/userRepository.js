const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function crearUsuario(data) {
    return await prisma.usuario.create({ data });
}

async function obtenerPorEmail(email) {
    return await prisma.usuario.findUnique({ where: { email } });
}

async function cambiarAPremium(id) {
    return prisma.usuario.update({
        where: { id: parseInt(id) },
        data: { rol: 'premium' }
    });
}

module.exports = { crearUsuario, obtenerPorEmail, cambiarAPremium };
