"use strict";
exports.__esModule = true;
function isLoginRequest(url) {
    var legalUrls = ['/auth/signin', '/auth/signup', '/auth/signup/submit', '/'];
    return legalUrls.indexOf(url) !== -1;
}
function checkCookie(req, res, next) {
    if (req.method === 'OPTIONS')
        next();
    console.log("missed:", req.method);
    // expired and is not a login request
    if (!req.session.loggedin && !isLoginRequest(req.originalUrl)) {
        res.statusCode = 401;
        res.send('Session expired, please login again');
    }
    // submit register form without a userId
    if (req.originalUrl === '/auth/signup/submit' && !req.session.encryptedId) {
        console.log("unauth: ", req.method, req.originalUrl);
        res.statusCode = 401;
        res.send('Unauthorized to perform this action');
    }
    // not expired, reset a field to reset the expire time
    else if (!isLoginRequest(req.originalUrl)) {
        console.log("spinner; ", req.originalUrl, req.method);
        req.session.spinner = !req.session.spinner;
    }
    console.log("into routers: ", req.method, req.originalUrl);
    next();
}
exports["default"] = checkCookie;
