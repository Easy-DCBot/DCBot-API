CREATE DATABASE EasyDiscrodBot;

USE EasyDiscrodBot;

CREATE TABLE users(
    ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    isAdmin bit
);

CREATE TABLE Bot(
    Bot_Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Bot_Token varchar(255) NOT NULL,
    Bot_Owner_id int NOT NULL,
    Bot_User_Name varchar(255) NOT NULL,
    FOREIGN KEY (Bot_Owner_id) REFERENCES users(ID)
);

CREATE TABLE Bot_Commands(
    Command_Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Bot_Id int NOT NULL,
    Command varchar(255) NOT NULL,
    Answer varchar(255) NOT NULL,
    FOREIGN KEY (Bot_Id) REFERENCES Bot(Bot_Id)
);
-- ## Test Case for Database ## -- 
INSERT INTO `users`(`username`, `password`, `isAdmin`) VALUES ('Admin','universal','1');
INSERT INTO `users`(`username`, `password`, `isAdmin`) VALUES ('User','nobody','0');

INSERT INTO `bot`(`Bot_Token`, `Bot_Owner_id`, `Bot_User_Name`) VALUES ('d15cr0db0770k3n',1,'Admin-Test-Bot');

INSERT INTO `bot_commands`(`Bot_Id`, `Command`, `Answer`) VALUES (1,'test','Hello');