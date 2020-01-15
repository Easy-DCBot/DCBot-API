const config = require('./config.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('./database.js')

async function login(req, res){
    let user = await Database.getUser(req.body.username,req.body.password);
    if(user != false){
        let Bot_id = await Database.getBots(user);
        var token = jwt.sign({ id: user, bot_id : Bot_id}, config.secret, {
        expiresIn: 86400 
      });
      res.status(200).send({ auth: true, token: token });
    }
}

async function getToken(req, res){
    let verify = await Verify(req, res);
    if(verify != 0){
        res.status(200).send(verify);  
    }
    
}

async function getBots(req, res){
    let verify = await Verify(req, res);
    if(verify != 0){
        res.status(200).send(verify.bot_id);  
    }
}

async function getbotcommands(req, res){ 
    let verify = await Verify(req, res);
    if(verify != 1){
        var Commands = await Database.getBotCommands(req.body.Bot_id);
        res.status(200).send(Commands); 
    }
}

async function postBotCommand(req, res){
    let verify = await Verify(req, res);
    if(verify != 1){
        if(req.body.Bot_id != null || req.body.Command != null || req.body.Answer != 0){
            let postBotCommand = await Database.postBotCommand(req.body.Bot_id,req.body.Command,req.body.Answer);
            console.log("sst" + postBotCommand);
            if(postBotCommand == 0){
               res.status(200).send("New Command Added!"); 
            }
            if(postBotCommand == 2){
                res.status(401).send('Command already exists!');
            }
        }else{
            res.status(401).send('Not all attributes');
        }
    }
}

function Verify(req ,resu){
    return new Promise(res => {
        var token = req.headers['x-access-token'];
        if (!token) return resu.status(401).send({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) return resu.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            res(decoded);
        });
        res(1);
    });
}

module.exports = {
    login,
    getToken,
    getBots,
    getbotcommands,
    postBotCommand
};