const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const PORT = 8000;


app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}\nhttp://localhost:${PORT}`);
});