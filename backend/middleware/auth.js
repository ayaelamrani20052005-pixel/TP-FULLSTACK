const jwt = require('jsonwebtoken');

module.exports = (roles = []) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token manquant' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (roles.length && !roles.includes(decoded.role))
      return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });

    req.user = decoded;
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError')
      return res.status(401).json({ message: 'Session expirée, reconnectez-vous', expired: true });
    return res.status(401).json({ message: 'Token invalide' });
  }
};
