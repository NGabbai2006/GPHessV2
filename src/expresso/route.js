const REGEX_USERNAME = /^.{4,16}$/;
const REGEX_PASSWORD = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,64})$/;

app.post('/api/inscription', (req, res) => {
    if (!REGEX_USERNAME.test(req.body.username)) return res.json({ "message": "Username invalide" });
    if (!REGEX_PASSWORD.test(req.body.password)) return res.json({ "message": "Mot de passe invalide" });

    bdd.query("SELECT * FROM users WHERE login = ?;", [req.body.username], (err, results) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (results.length > 0) { return res.json({ "message" : "Utilisateur déjà pris" }) };

        bcrypt.hash(req.body.password, 10, (err, password) => {
            if (err) return res.status(500).json({ erreur: err.message });
            
            bdd.query("INSERT INTO users (login, password) VALUES (?, ?);", [req.body.username, password], (err, results) => {
                if (err) return res.status(500).json({ erreur: err.message });

                return res.json({ "message" : "Compte créé" });
            })
        })
    })
})



app.post('/api/veriftoken', verifToken, (req, res) => {
    return res.json({ valide: true });
})

app.post('/api/changeuser', verifToken, (req, res) => {
    const newUsername = req.body.newUsername;

    if (!REGEX_USERNAME.test(newUsername)) return res.status(400).json({ erreur: "Nouveau mot de passe invalide" });

    bdd.query("SELECT id,admin FROM users WHERE login = ?;", [newUsername], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length > 0) return res.status(400).json({ error: "Username déjà pris" });
    
            bdd.query("UPDATE users SET login = ? WHERE id = ?;", [newUsername, req.user.id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
    
                const token = jwt.sign(
                    { id: req.user.id, username: newUsername, admin : results[0].admin },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
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



app.get('/api/loadCoords', verifToken, (req, res) => {
    bdd.query("SELECT date, coordonnee FROM gps", (result, err) => {
        if (err) return res.json({ "erreur": err});

        for (let i = 0; i < result.length; i++) {
            res.send(result[i]);
        }
        return res.json({ "date": result.data, "coordonnee": result.coordonee });
    })
})

app.post('/api/deconnexion', verifToken, (req, res) => {
  res.clearCookie('authToken');
  console.log("l'id " + req.user.id + " se déco");
  res.json({ message: 'Déconnecté' });
});