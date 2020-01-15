const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const Database = require('./database.js')

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
  Database.databaseGetUser("test","test");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});