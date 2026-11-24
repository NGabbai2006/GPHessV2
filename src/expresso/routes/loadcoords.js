app.get('/api/loadCoords', verifToken, (req, res) => {
    bdd.query("SELECT date, coordonnee FROM gps", (result, err) => {
        if (err) return res.json({ "erreur": err});

        for (let i = 0; i < result.length; i++) {
            res.send(result[i]);
        }
        return res.json({ "date": result.data, "coordonnee": result.coordonee });
    })
})