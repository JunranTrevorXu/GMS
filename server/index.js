"use strict";
exports.__esModule = true;
var express = require("express");
var cookieSession = require("cookie-session");
var index_1 = require("./Middleware/index");
var index_2 = require("./POST/index");
var app = express();
var port = 1994;
app.use(cookieSession({
    name: 'GMS-session',
    keys: ['Junran', 'Ace'],
    maxAge: 10 * 1000
}));
index_1["default"](app);
index_2["default"](app);
app.listen(port, function () { return console.log('listening in port ', port); });
