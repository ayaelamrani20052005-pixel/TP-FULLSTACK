const prisma = require('../config/db');

const getAll = () =>
  prisma.user.findMany({
    where: { role: 'etudiant' },
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      inscription: {
        include: { formation: true },
      },
    },
  });

const getById = (id) =>
  prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      inscription: {
        include: { formation: true },
      },
    },
  });

module.exports = { getAll, getById };
