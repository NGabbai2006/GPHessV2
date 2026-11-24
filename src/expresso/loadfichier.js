const loadFichiers = (app) => {
    // HTML
    app.get('/',                        (req, res) => { res.sendFile("index.html",          { root: "./public/html" }); });
    app.get('/connexion',               (req, res) => { res.sendFile("connexion.html",      { root: "./public/html" }); });
    app.get('/inscription',             (req, res) => { res.sendFile("inscription.html",    { root: "./public/html" }); });
    app.get('/parametres',              (req, res) => { res.sendFile("parametres.html",     { root: "./public/html" }); });

    // CSS
    app.get('/style/style.css',         (req, res) => { res.sendFile("style.css",           { root: "./public/style" }); });
    app.get('/terreplate.jpg',          (req, res) => { res.sendFile("/terreplate.jpg",     { root: "./public/style" }); });

    // JS
    app.get('/script/index.js',         (req, res) => { res.sendFile("index.js",            { root: "./public/script" }); });
    app.get('/script/connexion.js',     (req, res) => { res.sendFile("connexion.js",        { root: "./public/script" }); });
    app.get('/script/inscription.js',   (req, res) => { res.sendFile("inscription.js",      { root: "./public/script" }); });
    app.get('/script/trames.js',        (req, res) => { res.sendFile("trames.js",           { root: "./public/script" }); });
    app.get('/script/parametres.js',    (req, res) => { res.sendFile("parametres.js",       { root: "./public/script" }); });
    app.get('/script/map.js',           (req, res) => { res.sendFile("map.js",              { root: "./public/script" }); });

    // Leaflet
    app.get('/leaflet/leaflet.css',     (req, res) => { res.sendFile("leaflet.css",         { root: "./public/leaflet" }); });

    return app;
}

module.exports = { loadFichiers };