const bdd = require('../bdd');
const bcrypt = require('bcrypt');

const changePassword = (app) => {
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
    return app;
};

module.exports = { changePassword };