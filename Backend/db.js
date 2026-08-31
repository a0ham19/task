const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME || "todo__app",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "019a0HamHAShem^^.",
    {
        host: process.env.DB_HOST || "192.168.1.175",
        dialect: process.env.DB_DIALECT || "mysql",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

module.exports = sequelize;
