const { Organization } = require('../models');
const base = require('./base.controller');

exports.getAll = base.getAll(Organization, ['name']);
exports.create = base.create(Organization);
exports.remove = base.remove(Organization);
