"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 1994;
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(port, function () { return console.log('listening in port ', port); });
