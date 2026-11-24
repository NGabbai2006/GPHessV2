// Modules
const app = require('./src/expresso/express');
const bdd = require('./src/expresso/bdd');
const wss = require('./src/websocket/websocket')

// Constantes
const PORT = 8080;

// Serveur Express
app.listen(PORT, () => { 
    console.log(`Le serveur est en écoute sur le port ${PORT}\nhttp://localhost:${PORT}`); 
});

// Port Série
require('./src/serialport/serialport')("COM10", bdd);

// WebSocket
wss.on("connection", (ws) => {
    console.log("Nouveau client");
    ws.send("test");
});