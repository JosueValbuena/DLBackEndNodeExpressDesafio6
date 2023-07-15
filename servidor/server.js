const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool ({
    user: "postgres", //process.env.DB_USER,
    host: "localhost", //process.env.DB_HOST,
    database: "softjobs", //process.env.DB_DATABASE,
    password: "postgres", //process.env.DB_PASSWORD,
    allowExitOnIdle: true
});

module.exports = pool;