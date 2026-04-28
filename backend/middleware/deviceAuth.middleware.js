const { Device } = require('../models');

exports.deviceAuth = async (req, res, next) => {
  try {
    const key = req.headers['x-device-key'];

    if (!key)
      return res.status(401).json({ message: 'Device key required' });

    const device = await Device.findOne({
      where: { api_key: key }
    });

    if (!device)
      return res.status(401).json({ message: 'Invalid device key' });

    req.device = device;
    next();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
