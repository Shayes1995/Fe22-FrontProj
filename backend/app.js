const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();

app.use(cors()); // Use the cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/apartement', require('./controllers/apartementController'));

module.exports = app;
