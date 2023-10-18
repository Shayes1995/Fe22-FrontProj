const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); // using cors so that the frontend can access the backend

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/apartement', require('./controllers/apartementController'));
app.use('/api/user', require('./controllers/registerController'));

module.exports = app;
