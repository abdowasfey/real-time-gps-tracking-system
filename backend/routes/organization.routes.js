const router = require('express').Router();
const controller = require('../controllers/organization.controller');
const { auth, allowRoles } = require('../middleware/auth.middleware');

router.get('/', auth, allowRoles('admin'), controller.getAll);
router.post('/', auth, allowRoles('admin'), controller.create);
router.delete('/:id', auth, allowRoles('admin'), controller.remove);

module.exports = router;
