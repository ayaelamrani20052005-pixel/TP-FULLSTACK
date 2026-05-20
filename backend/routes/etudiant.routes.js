const router = require('express').Router();
const auth = require('../middleware/auth');
const etudiantService = require('../services/etudiant.service');

router.get('/', auth(['admin']), async (req, res) => {
  const etudiants = await etudiantService.getAll();
  res.json(etudiants);
});

router.get('/:id', auth(['admin']), async (req, res) => {
  const etudiant = await etudiantService.getById(req.params.id);
  if (!etudiant) return res.status(404).json({ message: 'Étudiant introuvable' });
  res.json(etudiant);
});

module.exports = router;
