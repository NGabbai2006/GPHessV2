const mysql = require('mysql');

module.exports = bdd = mysql.createConnection({
    host: process.env.BDDHOST,
    user: process.env.BDDUSER,
    password: process.env.BDDPASSWORD,
    database: process.env.BDDDATABASE
});