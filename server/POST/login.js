"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
router.post('/', function (req, res) {
    res.send('loged in');
});
exports["default"] = router;
