const router = require('express').Router();
const { Machine } = require('../models');

router.post('/', async (req, res) => {
  const item = await Machine.create(req.body);
  res.json(item);
});

router.get('/', async (req, res) => {
  const items = await Machine.findAll();
  res.json(items);
});

module.exports = router;
