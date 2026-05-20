const router = require('express').Router();
const prisma = require('../config/db');
const auth = require('../middleware/auth');

router.get('/', auth(), async (req, res) => {
  const formations = await prisma.formation.findMany();
  res.json(formations);
});

router.post('/', auth(['admin']), async (req, res) => {
  const { titre, duree } = req.body;
  await prisma.formation.create({ data: { titre, duree: parseInt(duree) } });
  res.status(201).json({ message: 'Formation créée' });
});

router.put('/:id', auth(['admin']), async (req, res) => {
  const { titre, duree } = req.body;
  await prisma.formation.update({
    where: { id: parseInt(req.params.id) },
    data: { titre, duree: parseInt(duree) },
  });
  res.json({ message: 'Formation modifiée' });
});

router.delete('/:id', auth(['admin']), async (req, res) => {
  await prisma.formation.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Formation supprimée' });
});

module.exports = router;
