const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user.model');

const Machine = sequelize.define('Machine', {
  mac_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  model: DataTypes.STRING,

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'user', key: 'user_id' }
  }

}, {
  tableName: 'machine',
  timestamps: false
});

User.hasMany(Machine, { foreignKey: 'user_id' });
Machine.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Machine;
