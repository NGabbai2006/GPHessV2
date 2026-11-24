const { WebSocket } = require('ws');

const wss = new WebSocket.Server({ url: "172.29.18.180", port: 8081 })

module.exports = wss;