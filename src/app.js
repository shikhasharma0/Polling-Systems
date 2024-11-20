const express = require('express');
const pollRoutes = require('./routes/pollRoutes');

const app = express();
app.use(express.json());

app.use('/polls', pollRoutes);

module.exports = app;
