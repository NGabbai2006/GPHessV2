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