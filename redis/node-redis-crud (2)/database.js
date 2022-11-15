const { Sequelize } = require("sequelize");

const db = new Sequelize("nodedb", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  pool: {
    min: 1,
    max: 20,
    acquire: 3000,
    idle: 1000,
  },
  logging: false,
});

module.exports = db;
