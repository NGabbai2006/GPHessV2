const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const serialport = require('serialport');
const websocket = require('ws');

const app = express();

const PORT = 8000;
const REGEX_USERNAME = /^.{4,16}$/;
const REGEX_PASSWORD = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,64})$/;

app.use(express.static(__dirname + '/public'));
app.use(cors());
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

app.get('/', (req, res) => { res.sendFile("index.html", { root: path.join(__dirname, "public", "html") }); });
app.get('/connexion', (req, res) => { res.sendFile("connexion.html", { root: path.join(__dirname, "public", "html") }); });
app.get('/inscription', (req, res) => { res.sendFile("inscription.html", { root: path.join(__dirname, "public", "html") }); });
app.get('/parametres', (req, res) => { res.sendFile("parametres.html", { root: path.join(__dirname, "public", "html") }); });

app.get('/style/style.css', (req, res) => { res.sendFile("style.css", { root: path.join(__dirname, "public", "style") }); });

app.get('/script/main.js', (req, res) => { res.sendFile("main.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/connexion.js', (req, res) => { res.sendFile("connexion.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/inscription.js', (req, res) => { res.sendFile("inscription.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/trames.js', (req, res) => { res.sendFile("trames.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/parametres.js', (req, res) => { res.sendFile("parametres.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/map.js', (req, res) => { res.sendFile("map.js", { root: path.join(__dirname, "public", "script") }); });

app.get('/leaflet/leaflet.css', (req, res) => { res.sendFile("leaflet.css", { root: path.join(__dirname, "public", "leaflet") }); });

function verifToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) return res.status(401).json({ erreur: "Token manquant" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ erreur: "Token invalide ou expiré" });
        req.user = user;
        next();
    });
}

// renommer les routes et les variables
// ajouter les points virgules
// ajouter des commentaires
// corriger les erreurs de sécurité 
app.post('/api/inscription', (req, res) => {
    if (!REGEX_USERNAME.test(req.body.username)) return res.json({ "message": "Username invalide" });
    if (!REGEX_PASSWORD.test(req.body.password)) return res.json({ "message": "Mot de passe invalide" });

    bdd.query("SELECT * FROM users WHERE login = ?;", [req.body.username], (err, results => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (results.length > 0) { return res.json({ "message" : "Utilisateur déjà pris" }) };

        bcrypt.hash(req.body.password, process.env.BCRYPT_HASH, (err, password) => {
            if (err) return res.status(500).json({ erreur: err.message });
            
            bdd.query("INSERT INTO users (login, password) VALUES (?, ?);", [req.body.username, password], (err, results) => {
                if (err) return res.status(500).json({ erreur: err.message });

                return res.json({ "message" : "Compte créé" });
            })
        })
    }))
})

app.post('/api/connexion', (req, res) => {
    bdd.query("SELECT * FROM users WHERE login = ?;", [req.body.username], (err, results) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (results.length == 0) return res.status(401).json({ erreur: "Utilisateur introuvable"});

        bcrypt.compare(req.body.password, results[0].password, (err, match) => {
            if (err) return res.status(500).json({ erreur: err.message });
            if (!match) return res.status(401).json({ erreur: "Mot de passe incorrect" });
            
            const token = jwt.sign(
                { id: results[0].id, username: results[0].username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({ message: "Connexion réussie", token: token });
        })
    })
})

app.post('/api/veriftoken', verifToken, (req, res) => {
    return res.json({ valide: true });
})

app.post('/api/changeuser', verifToken, (req, res) => {
    const newUsername = req.body.newUsername;

    if (!REGEX_USERNAME.test(newUsername)) return res.status(400).json({ erreur: "Nouveau mot de passe invalide" });

    bdd.query("SELECT id FROM users WHERE login = ?;", [newUsername], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) return res.status(400).json({ error: "Username déjà pris" });
    
            bdd.query("UPDATE users SET login = ? WHERE id = ?;", [newUsername, req.user.id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
    
                const token = jwt.sign(
                    { id: req.user.id, username: newUsername },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                return res.json({ message: "Username modifié", token: token });
            });
        });
}) 

app.post('/api/changepassword', verifToken, (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!PASSWORD_PATTERN.test(newPassword)) return res.status(400).json({ error: "Nouveau mot de passe invalide" });

    bdd.query("SELECT password FROM users WHERE id = ?;", [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        bcrypt.compare(oldPassword, results[0].hashed_password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });

            if (!isMatch) return res.status(401).json({ error: "Ancien mot de passe incorrect" });

            bcrypt.hash(newPassword, 10, (err, hashed) => {
                if (err) return res.status(500).json({ error: err.message });

                bdd.query("UPDATE users SET password = ? WHERE id = ?;", [hashed, req.user.id], (err) => {
                    if (err) return res.status(500).json({ error: err.message }); 

                    return res.json({ message: "Mot de passe modifié" });
                });
            });
        });
    });
});

app.post('/api/deleteaccount', verifToken, (req, res) => {
	bdd.query("DELETE FROM users WHERE id = ?;", [req.user.id], (err) => {
		if (err) { console.log(err); return res.status(500).json({ error: err.message }); }
		return res.json({ message: "Compte supprimé" });
	});
});

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}\nhttp://localhost:${PORT}`);
});