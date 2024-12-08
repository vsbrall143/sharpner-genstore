const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('GENSTORE', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  item: {
    type: Sequelize.STRING,
    allowNull: false
  },  
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.STRING,
    allowNull: false
  }

});

module.exports = User;
