// Modules
const app = require('./src/expresso/express');
const bdd = require('./src/expresso/bdd');

// Constantes
const PORT = 8080;

// BDD
require('./src/serialport/serialport')("COM10", bdd);

// Serveur Express
app.listen(PORT, () => { console.log(`Le serveur est en écoute sur le port ${PORT}\nhttp://localhost:${PORT}`); });