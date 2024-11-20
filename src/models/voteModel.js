const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { PollOption } = require('./pollModel');

// Define Vote Model
const Vote = sequelize.define('Vote', {
  pollId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Poll',
      key: 'id',
    },
    allowNull: false,
  },
  option: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'PollOption',
      key: 'option',
    },
  },
});

// Define Relationships
PollOption.hasMany(Vote, { foreignKey: 'option', sourceKey: 'option' });
Vote.belongsTo(PollOption, { foreignKey: 'option', targetKey: 'option' });

module.exports = Vote;
