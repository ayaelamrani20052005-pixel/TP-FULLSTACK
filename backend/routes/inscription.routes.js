const router = require('express').Router();
const auth = require('../middleware/auth');
const inscriptionService = require('../services/inscription.service');

router.post('/', auth(['etudiant']), async (req, res) => {
  try {
    await inscriptionService.inscrire(req.user.id, req.body.formation_id);
    res.status(201).json({ message: 'Inscription réussie' });
  } catch {
    res.status(400).json({ message: 'Déjà inscrit à une formation' });
  }
});

router.get('/moi', auth(['etudiant']), async (req, res) => {
  const inscription = await inscriptionService.getMienne(req.user.id);
  res.json(inscription ? inscription.formation : null);
});

module.exports = router;
