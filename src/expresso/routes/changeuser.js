const bdd = require('../bdd');
require('dotenv').config();

const changeUser = (app) => {
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
    return app; 
}

module.exports = { changeUser };