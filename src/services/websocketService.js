const WebSocket = require('ws');

// Create a WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

// Broadcast data to all connected clients
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Log WebSocket connections and disconnections
wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

module.exports = { wss, broadcast };




