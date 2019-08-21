"use strict";
exports.__esModule = true;
function checkCookie(req, res, next) {
    // expired and is not a login request
    if (req.session.isNew && req.originalUrl !== '/login') {
        req.session.spinner = true;
        res.send('please login');
    }
    // not expired, reset a field to reset the expire time
    else {
        req.session.spinner = !req.session.spinner;
        next();
    }
}
exports["default"] = checkCookie;
