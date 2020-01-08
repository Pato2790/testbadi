const mysql = require('mysql');
const initModel = require('../configs/models.init');

const [
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB_NAME
] = require('../constants/DBConstants');

const initDB = () => {
  const mysqlCon = mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS
  });

  mysqlCon.connect((err) => {
    // Can not connect with SQLServer
    if (err) {
      console.error(err);
      setTimeout(initDB, 5000);
    } else {
      mysqlCon.query(
        `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB_NAME}`, (err, result) => {
          if (err) {
            console.error(err);
            setTimeout(initDB, 5000);
          } else {
            console.info(`DB ${MYSQL_DB_NAME} OK`);
            // Models Sync
            initModel();
          }
        });
    }
  });
};

module.exports = initDB;