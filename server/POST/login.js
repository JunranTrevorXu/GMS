"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
router.post('/', function (req, res) {
    // TODO
    req.session.spinner = true;
    res.send('loged in');
});
exports["default"] = router;
