module.exports = function verifToken(req, res, next) {
    const header = req.headers['cookie'];
    if (!header) return res.status(401).json({ erreur: "Header manquant" });
    const token = header.split("=")[1];

    if (!token) return res.status(401).json({ erreur: "Token manquant" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ erreur: "Token invalide ou expiré" });
        req.user = user;
        next();
    });
}
