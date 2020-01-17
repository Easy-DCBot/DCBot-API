const config = require('./config.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('./database.js')

async function login(req, res){
    if(req.body.username != null && req.body.password != null){
        let user = await Database.getUser(req.body.username,req.body.password);
        console.log("user : " + user);
        if(user != false){
            let Bot_id = await Database.getBots(user.ID);
            var token = jwt.sign({ id: user.ID, bot_id : Bot_id, isAdmin: user.isAdmin[0]}, config.secret, {
                expiresIn: 86400 
            });
            res.status(200).send({ auth: true, token: token });
        }else{
            res.status(401).send('User not found!');    
        }
    }else{
        res.status(401).send('Not all attributes');
    }
}

async function getToken(req, res){
    let verify = await Verify(req, res);
    if(verify != 0){
        if(verify.isAdmin == 1){
            res.status(200).send(verify);  
        }else{
            res.status(401).send('No Permissions');
        }
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
    let bot_own = await Database.Bot_Own(req.body.Bot_id, verify.id, verify.isAdmin);
    if(verify != 1){
        if(bot_own == 1){
            if(req.body.Bot_id != null){
                var Commands = await Database.getBotCommands(req.body.Bot_id);
                res.status(200).send(Commands); 
            }else{
                res.status(401).send('Not all attributes');
            }
        }else{
            res.status(401).send('No Permissions');
        }
    }
}

async function postBotCommand(req, res){
    let verify = await Verify(req, res);
    let bot_own = await Database.Bot_Own(req.body.Bot_id, verify.id, verify.isAdmin);
    if(verify != 1){
        if(bot_own == 1){
            if(req.body.Bot_id != null || req.body.Command != null || req.body.Answer != null){
                let postBotCommand = await Database.postBotCommand(req.body.Bot_id,req.body.Command,req.body.Answer);
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
}

async function BotCommand(req, res){
    let verify = await Verify(req, res);
    let bot_own = await Database.Bot_Own(req.body.Bot_id, verify.id, verify.isAdmin);
    if(verify != 1){
        if(bot_own == 1){
            if(req.body.Bot_id != null && req.body.Command != null){
                let command = await Database.BotCommand(req.body.Bot_id, req.body.Command);
                if(command == 0){
                    //res.status(200).send('No command found');
                    res.status(200).send('0');
                }else{
                    res.status(200).send(command);
                }
            }else{
                res.status(401).send('Not all attributes');
            }
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
    postBotCommand,
    BotCommand
};