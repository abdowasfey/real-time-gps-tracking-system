const router = require('express').Router();
const { Device } = require('../models');

router.post('/', async (req, res) => {
  const device = await Device.create(req.body);
  res.json(device);
});

router.get('/', async (req, res) => {
  const devices = await Device.findAll();
  res.json(devices);
});

module.exports = router;
