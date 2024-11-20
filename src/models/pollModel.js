const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Define Poll Model
const Poll = sequelize.define('Poll', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define PollOption Model
const PollOption = sequelize.define('PollOption', {
  option: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define Relationships
Poll.hasMany(PollOption, { as: 'options', foreignKey: 'pollId' });
PollOption.belongsTo(Poll, { foreignKey: 'pollId' });

module.exports = { Poll, PollOption };
