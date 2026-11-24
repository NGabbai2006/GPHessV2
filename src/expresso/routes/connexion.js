app.post('/api/connexion', (req, res) => {
    bdd.query("SELECT * FROM users WHERE login = ?;", [req.body.username], (err, results) => {
        if (err) return res.status(500).json({ erreur: err.message });
        if (results.length == 0) return res.status(401).json({ erreur: "Utilisateur introuvable"});

        bcrypt.compare(req.body.password, results[0].password, (err, match) => {
            if (err) return res.status(500).json({ erreur: err.message });
            if (!match) return res.status(401).json({ erreur: "Mot de passe incorrect" });
            
            const token = jwt.sign(
                { id: results[0].id, username: results[0].login, admin : results[0].admin},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            console.log("connexion réussie: " + req.body.username);
            res.cookie('authToken', token, {
                httpOnly: true, //empêche le JavaScript d'accéder au cookie, donc protège contre le XSS
                secure: false, // force le cookie à passer uniquement en HTTPS si true                         !!! attention à mettre true en production !!!
                sameSite: 'strict', //protège contre les attaques CSRF.
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            return res.json({ success: true });
        })
    })
})