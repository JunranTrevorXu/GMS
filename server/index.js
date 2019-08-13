"use strict";
exports.__esModule = true;
var express = require("express");
var cookieSession = require("cookie-session");
var checkCookie_1 = require("./checkCookie");
var app = express();
var port = 1994;
app.use(cookieSession({
    name: 'GMS-session',
    keys: ['J', 'R'],
    maxAge: 10 * 1000
}));
app.use(checkCookie_1["default"]);
app.get('/', function (req, res) {
    res.send('hello world');
});
app.listen(port, function () { return console.log('listening in port ', port); });
