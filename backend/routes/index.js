const router = require('express').Router();

router.use('/users', require('./user.routes'));
router.use('/machines', require('./machine.routes'));
router.use('/devices', require('./device.routes'));
router.use('/locations', require('./location.routes'));
router.use('/organizations', require('./organization.routes'));

module.exports = router;
