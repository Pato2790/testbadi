const { Sequelize } = require('sequelize');
const [
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB_NAME
 ] = require('../constants/DBConstants');

// Initialize sequelize
const sequelize = new Sequelize(MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 100000
  },
});

module.exports = sequelize;
