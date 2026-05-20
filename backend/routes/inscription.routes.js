const router = require('express').Router();
const prisma = require('../config/db');
const auth = require('../middleware/auth');

router.post('/', auth(['etudiant']), async (req, res) => {
  const { formation_id } = req.body;
  const etudiant_id = req.user.id;
  try {
    await prisma.inscription.create({
      data: { etudiant_id, formation_id: parseInt(formation_id) },
    });
    res.status(201).json({ message: 'Inscription réussie' });
  } catch {
    res.status(400).json({ message: 'Déjà inscrit à une formation' });
  }
});

router.get('/moi', auth(['etudiant']), async (req, res) => {
  const inscription = await prisma.inscription.findUnique({
    where: { etudiant_id: req.user.id },
    include: { formation: true },
  });
  res.json(inscription ? inscription.formation : null);
});

module.exports = router;
