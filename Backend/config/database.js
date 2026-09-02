const baseConfig = {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "mydb",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
};

module.exports = {
    development: baseConfig,
    test: baseConfig,
    production: baseConfig,
};