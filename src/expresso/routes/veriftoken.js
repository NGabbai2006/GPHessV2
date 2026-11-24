app.post('/api/veriftoken', verifToken, (req, res) => {
    return res.json({ valide: true });
})