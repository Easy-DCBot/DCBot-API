const express = require('express');
const config = require('./config.json');
const middelware = require('./middelware.js');


const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  res.send('Easy Discord Bot\n Version: ' + config.version);
});

app.get('/getbots',function(req, res){
  middelware.getBots(req, res);
});

app.post('/login',(req, res) => {
  console.log(req.body);
  middelware.login(req, res);
});

app.post('/me', function(req, res){
  middelware.getToken(req, res);
});

app.post('/getbotcommands',function(req, res){
  middelware.getbotcommands(req, res);
});

app.post('/postBotCommand',function(req, res){
  middelware.postBotCommand(req, res);
});

app.post('/BotCommand',function(req, res){
  middelware.BotCommand(req, res);
});