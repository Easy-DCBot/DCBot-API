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

function databaseGetUser(user,password){
    return new Promise(res => {
        query = "SELECT ID FROM Users WHERE username = '"+ user + "' AND password = '" +password + "';";
        console.log(query);
        Database_Connection.query(query,function(err, result, fields, rows){
            if(err){
                throw err;
            }else{
                if(result.length === 0){
                    res(false);
                }else{
                    res(true);
                }
            }
        });
    });
}

module.exports = {
    databaseGetUser
};