exports.sendLocation = async (req, res) => {
  const { latitude, longitude, status } = req.body;

  await Location.create({
    device_id: req.device.device_id,
    latitude,
    longitude,
    status
  });

  res.json({ success: true });
};
