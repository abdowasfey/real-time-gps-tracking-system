const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Organization = sequelize.define('Organization', {
  org_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'organization',
  timestamps: false,
});

module.exports = Organization;
