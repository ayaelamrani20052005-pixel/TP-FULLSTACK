const router = require('express').Router();
const authService = require('../services/auth.service');

router.post('/register', async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: 'Compte créé' });
  } catch (e) {
    res.status(e.status || 400).json({ message: e.message || 'Email déjà utilisé' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message || 'Erreur serveur' });
  }
});

module.exports = router;
