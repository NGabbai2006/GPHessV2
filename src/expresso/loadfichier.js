app.get('/', (req, res) => { res.sendFile("index.html", { root: path.join(__dirname, "public", "html") }); });
app.get('/connexion', (req, res) => { res.sendFile("connexion.html", { root: path.join(__dirname, "public", "html") }); });
app.get('/inscription', (req, res) => { res.sendFile("inscription.html", { root: path.join(__dirname, "public", "html") }); });
app.get('/parametres', (req, res) => { res.sendFile("parametres.html", { root: path.join(__dirname, "public", "html") }); });

app.get('/style/style.css', (req, res) => { res.sendFile("style.css", { root: path.join(__dirname, "public", "style") }); });

app.get('/script/index.js', (req, res) => { res.sendFile("index.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/connexion.js', (req, res) => { res.sendFile("connexion.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/inscription.js', (req, res) => { res.sendFile("inscription.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/trames.js', (req, res) => { res.sendFile("trames.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/parametres.js', (req, res) => { res.sendFile("parametres.js", { root: path.join(__dirname, "public", "script") }); });
app.get('/script/map.js', (req, res) => { res.sendFile("map.js", { root: path.join(__dirname, "public", "script") }); });

app.get('/leaflet/leaflet.css', (req, res) => { res.sendFile("leaflet.css", { root: path.join(__dirname, "public", "leaflet") }); });
app.get('/terreplate.jpg', (req, res) => { res.sendFile("/terreplate.jpg", { root: path.join(__dirname, "public", "style") }); });