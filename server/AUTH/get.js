"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.send({
        OK: true,
        isLoggedIn: req.session.loggedin
    });
});
exports["default"] = router;
