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
    FOREIGN KEY (Bot_Owner_id) REFERENCES users(ID)
);

CREATE TABLE Bot_Commands(
    Command_Id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Bot_Name varchar(255) NOT NULL,
    Bot_Id int NOT NULL,
    Command varchar(255) NOT NULL,
    Answer varchar(255) NOT NULL,
    FOREIGN KEY (Bot_Id) REFERENCES Bot(Bot_Id)
);