const { Machine } = require('../models');
const base = require('./base.controller');

exports.getAll = base.getAll(Machine, ['model'], { ownerField: 'user_id' });
exports.create = base.create(Machine, { ownerField: 'user_id' });
exports.remove = base.remove(Machine, { ownerField: 'user_id' });
