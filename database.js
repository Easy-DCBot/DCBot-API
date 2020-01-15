const config = require('./config.json');
const mysql = require('mysql');

var Database_Connection = mysql.createConnection({
    host: config.Database_Host,
    user: config.Database_User,
    password: config.Database_Password
    });

Database_Connection.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("[Info]Connected to Database!");
    }
});

function databaseGetUser(user,password){
    query = "SELECT ID FROM Users WHERE user = "+ user + " AND password = " +password;
    Database_Connection.query(query,function(err, result){
        if(err){
            throw err;
        }else{
            console.log("[Debug]Result " + result);
        }
    });
}

module.exports = {
    databaseGetUser
};