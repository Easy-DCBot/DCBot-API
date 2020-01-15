const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config.json');
const Database = require('./database.js')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Easy Discord Bot\n Version: ' + config.version);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/login', async (req, res) => {
  console.log('Got body:', req.body.username);
  let user = await Database.databaseGetUser(req.body.username,req.body.password);
  console.log(user);
  if(!user){
    res.send('No!');
  }else{
    res.send('Yes!');
  }
});
