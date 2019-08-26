"use strict";
exports.__esModule = true;
var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require("dotenv").config();
var index_1 = require("./Database/MySql/index");
var index_2 = require("./Middleware/index");
var index_3 = require("./POST/index");
var app = express();
var port = parseInt(process.env.port);
index_1["default"].connect(function (error) {
    if (error) {
        console.error('mysql connecting: error' + error.stack);
    }
    else {
        console.log('mysql connected as id ' + index_1["default"].threadId);
    }
});
// middlewares
app.use(cookieSession({
    name: 'GMS-session',
    keys: ['Junran', 'Ace'],
    maxAge: 5 * 60 * 1000
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(function (req, res, next) {
    console.log("headers: ", req.method, req.originalUrl);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", process.env.clientHost);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.session.id) {
        console.log("set: ", req.session.id);
    }
    else {
        console.log("not set");
        req.session.id = 1108;
    }
    console.log(req.cookies);
    next();
});
// customized middlewares and handlers
index_2["default"](app);
index_3["default"](app);
app.get('/', function (req, res) {
    res.send("hello");
});
app.listen(port, function () { return console.log('listening in port ', port); });
