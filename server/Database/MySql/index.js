"use strict";
exports.__esModule = true;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.mysqlHost,
    user: process.env.mysqlUsername,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDatabase
});
exports["default"] = connection;
