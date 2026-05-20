const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const register = async ({ nom, prenom, email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { nom, prenom, email, password: hash, role: 'etudiant' },
  });
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 404, message: 'Utilisateur introuvable' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: 'Mot de passe incorrect' };

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  const { password: _, ...userSafe } = user;
  return { token, role: user.role, user: userSafe };
};

module.exports = { register, login };
