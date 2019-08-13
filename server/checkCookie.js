"use strict";
exports.__esModule = true;
function checkCookie(req, res, next) {
    if (req.session.isNew) {
        req.session.login = true;
        res.send('please login');
    }
    else {
        next();
    }
}
exports["default"] = checkCookie;
