const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

router.post('/register', async (req, res) => {
  const { nom, prenom, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: { nom, prenom, email, password: hash, role: 'etudiant' },
    });
    res.status(201).json({ message: 'Compte créé' });
  } catch {
    res.status(400).json({ message: 'Email déjà utilisé' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  res.json({ token, role: user.role, user });
});

module.exports = router;
