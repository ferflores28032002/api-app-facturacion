const Sequelize = require("sequelize");

const sequelize = new Sequelize("appFacturacionDb", "root", "12345", {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

module.exports = sequelize;