const config = require('./config.json');
const mysql = require('mysql');

var Database_Connection = mysql.createConnection({
    host: config.Database_Host,
    user: config.Database_User,
    password: config.Database_Password,
    database: config.Database_Database
    });

Database_Connection.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("[Info]Connected to Database!");
    }
});

function getUser(user,password){
    return new Promise(res => {
        query = "SELECT ID FROM Users WHERE username = '"+ user + "' AND password = '" + password + "';";
        Database_Connection.query(query,function(err, result){
            if(err){
                console.log("[ERROR]" + err);
                if(config.Debug){
                    throw err;
                }
            }else{
                if(result.length === 0){
                    res(false);
                }else{
                    res(result[0].ID);
                }
            }
        });
    });
}

function getBots(User_id){
   return new Promise(res => {
    query = "SELECT Bot_Id FROM Bot WHERE Bot_Owner_id = " + User_id + ";";
    Database_Connection.query(query,function(err,result){
        if(err){
            console.log("[ERROR]" + err);
            if(config.Debug){
                throw err;
            }
        }else{
            res(result);
        }
    });
   });
}

function getBotCommands(Bot_id){
    return new Promise(res => {
        query = "SELECT Command,Answer FROM Bot_Commands WHERE Bot_Id = " + Bot_id[0] + ";";
        Database_Connection.query(query,function(err,result){
            if(err){
                console.log("[ERROR]" + err);
                if(config.Debug){
                    throw err;
                }
            }else{
                res(result);
            }
        });
    });
}

function postBotCommand(Bot_id, Command, Answer){
    return new Promise(res => {

        query = "SELECT Command_Id FROM Bot_Commands WHERE Command like '" + Command + "';" 
        Database_Connection.query(query,function(err,result){
            if(err){
                console.log("[ERROR]" + err);
                if(config.Debug){
                    throw err;
                }
            }else{
                if(result.length === 0){
                    query = "INSERT INTO bot_commands(Bot_Id, Command, Answer) VALUES ('" + Bot_id[0] + "','" + Command + "','" + Answer + "');";
                    Database_Connection.query(query, function(err, result){
                        if(err){
                            if(config.Debug){
                                throw err;
                            }
                        }
                        res(0);
                    });
                }else{
                    res(2);
                }
            }
        });
    });
}

module.exports = {
    getUser,
    getBots,
    getBotCommands,
    postBotCommand
};