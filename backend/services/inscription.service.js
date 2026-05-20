const prisma = require('../config/db');

const inscrire = (etudiant_id, formation_id) =>
  prisma.inscription.create({
    data: { etudiant_id, formation_id: parseInt(formation_id) },
  });

const getMienne = (etudiant_id) =>
  prisma.inscription.findUnique({
    where: { etudiant_id },
    include: { formation: true },
  });

module.exports = { inscrire, getMienne };
