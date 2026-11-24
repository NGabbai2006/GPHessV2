const mysql = require('mysql');
require('dotenv').config();

module.exports = bdd = mysql.createConnection({
    host: process.env.BDDHOST,
    user: process.env.BDDUSER,
    password: process.env.BDDPASSWORD,
    database: process.env.BDDDATABASE
}).connect((err) => {
	if (err) { console.error(err); return; }
	console.log("Connecté à la BDD");
}); ;