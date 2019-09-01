"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    // reset the expire time when check auth
    if (req.session.loggedin) {
        req.session.spinner = !req.session.spinner;
    }
    console.log('check auth: ', req.session.loggedin);
    res.send({
        OK: true,
        isLoggedIn: req.session.loggedin
    });
});
exports["default"] = router;
