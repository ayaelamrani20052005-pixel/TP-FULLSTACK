const prisma = require('../config/db');

const getAll = () => prisma.formation.findMany();

const create = ({ titre, duree }) =>
  prisma.formation.create({ data: { titre, duree: parseInt(duree) } });

const update = (id, { titre, duree }) =>
  prisma.formation.update({
    where: { id: parseInt(id) },
    data: { titre, duree: parseInt(duree) },
  });

const remove = (id) =>
  prisma.formation.delete({ where: { id: parseInt(id) } });

module.exports = { getAll, create, update, remove };
