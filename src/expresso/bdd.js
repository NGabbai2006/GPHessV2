const mysql = require('mysql');

const bdd = mysql.createConnection({
    host: process.env.BDDHOST,
    user: process.env.BDDUSER,
    password: process.env.BDDPASSWORD,
    database: process.env.BDDDATABASE
});

bdd.connect((err) => {
	if (err) { console.error(err); return; }
	console.log("Connecté à la BDD");
}); 