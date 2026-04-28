const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Location = sequelize.define('Location', {
  loc_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  device_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'device', key: 'device_id' }
  },

  latitude: DataTypes.DECIMAL(9,6),
  longitude: DataTypes.DECIMAL(9,6),
  status: DataTypes.STRING,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }

}, {
  tableName: 'location',
  timestamps: false
});

module.exports = Location;
