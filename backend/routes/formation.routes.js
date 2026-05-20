const router = require('express').Router();
const auth = require('../middleware/auth');
const formationService = require('../services/formation.service');

router.get('/', auth(), async (req, res) => {
  const formations = await formationService.getAll();
  res.json(formations);
});

router.post('/', auth(['admin']), async (req, res) => {
  await formationService.create(req.body);
  res.status(201).json({ message: 'Formation créée' });
});

router.put('/:id', auth(['admin']), async (req, res) => {
  await formationService.update(req.params.id, req.body);
  res.json({ message: 'Formation modifiée' });
});

router.delete('/:id', auth(['admin']), async (req, res) => {
  await formationService.remove(req.params.id);
  res.json({ message: 'Formation supprimée' });
});

module.exports = router;
