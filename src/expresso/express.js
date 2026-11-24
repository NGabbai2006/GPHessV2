const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

var app = express();

app.use(express.static("../../public/"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const { loadFichiers } = require('./loadfichier');
const { loadApis } = require('./loadapis');
app = loadFichiers(app);
app = loadApis(app);

module.exports = app;