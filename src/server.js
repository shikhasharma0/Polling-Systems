require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { wss } = require('./services/websocketService');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');
const kafkaConsumer = require('./config/kafkaConsumer'); 

const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/polls', pollRoutes); 
app.use('/api/votes', voteRoutes); 

wss.on('connection', (socket) => {
  console.log('WebSocket client connected');
  socket.on('close', () => console.log('WebSocket client disconnected'));
});

app.get('/', (req, res) => {
  res.send('Polling System API is running.');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
