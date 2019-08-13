"use strict";
exports.__esModule = true;
function checkCookie(req, res, next) {
    // expired
    if (req.session.isNew) {
        req.session.spinner = 1;
        res.send('please login');
    }
    // not expired, reset a field to reset the expire time
    else {
        req.session.spinner = 1 - req.session.spinner;
        next();
    }
}
exports["default"] = checkCookie;
