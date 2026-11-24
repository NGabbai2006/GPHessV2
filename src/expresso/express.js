const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

var app = express();

app.use(express.static("../../public/"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//app = require('./loadfichier')(app);
const { loadFichiers } = require('./loadfichier');
app = loadFichiers(app);

module.exports = app;