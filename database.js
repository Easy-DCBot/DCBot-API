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
        query = "SELECT ID,isAdmin FROM Users WHERE username = '"+ user + "' AND password = '" + password + "';";
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
                    res(result[0]);
                }
            }
        });
    });
}

function getBots(User_id){
   return new Promise(res => {
    query = "SELECT Bot_Id,Bot_User_Name FROM Bot WHERE Bot_Owner_id = " + User_id + ";";
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

function getBotCommands(Bot_id, verify){
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

function BotCommand(Bot_Id, Command){
    return new Promise(res =>{
        query = "SELECT Answer FROM Bot_Commands WHERE Command like '" + Command + "' and Bot_Id = " + Bot_Id + ";";
        Database_Connection.query(query,function(err,result){
            if(err){
                console.log("[ERROR]" + err);
                if(config.Debug){
                    throw err;
                }
            }else{
                if(result.length != 0){
                    res(result[0].Answer);
                }else{
                    res(0);
                }
            }
        });
    });
}

function Bot_Own(Bot_Id,User_Id,isAdmin){
    return new Promise(res =>{
        if(isAdmin == 1){
            res(1);
        }
        query = "SELECT Bot_Owner_id FROM Bot WHERE Bot_Id = " + Bot_Id + ";";
        Database_Connection.query(query,function(err,result){
            if(err){
                console.log("[ERROR]" + err);
                if(config.Debug){
                    throw err;
                }
            }else{
                if(result[0].Bot_Owner_id == User_Id){
                    res(1);
                }else{
                    res(0);
                }
            }
        });
    });
}

module.exports = {
    getUser,
    getBots,
    getBotCommands,
    postBotCommand,
    BotCommand,
    Bot_Own
};