const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nazwisko: {
    type: DataTypes.STRING,
  },
  uprawnienia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ostatnieLogowanie: {
    type: DataTypes.DATE,
  },
  login: {
    type: DataTypes.STRING,
    unique: true,
  },
  haslo: {
    type: DataTypes.TEXT,
  },
  kodWeryfikacyjny: {
    type: DataTypes.STRING,
  },
});

module.exports = Employee;
