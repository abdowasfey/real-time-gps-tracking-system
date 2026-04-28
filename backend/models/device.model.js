const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Machine = require('./machine.model');

const Device = sequelize.define('Device', {
  device_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  machine_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'machine', key: 'mac_id' }
  },

  name: DataTypes.STRING,

  api_key: {           // ✅ ده كان ناقص
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }

}, {
  tableName: 'device',
  timestamps: false
});

Machine.hasMany(Device, { foreignKey: 'machine_id' });
Device.belongsTo(Machine, { foreignKey: 'machine_id' });

module.exports = Device;
