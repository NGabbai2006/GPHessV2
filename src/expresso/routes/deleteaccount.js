const deleteAccount = (app) => {
	app.post('/api/deleteaccount', verifToken, (req, res) => {
		bdd.query("DELETE FROM users WHERE id = ?;", [req.user.id], (err) => {
			if (err) { console.log(err); return res.status(500).json({ error: err.message }); }
			return res.json({ message: "Compte supprimé" });
		});
	});
	return app;
}

module.exports = { deleteAccount };