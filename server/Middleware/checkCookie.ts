function isLoginRequest(url: string): boolean {
    const legalUrls: Array<string> = ['/auth/signin', '/auth/signup', '/auth/signup/submit', '/auth', '/'];
    return legalUrls.indexOf(url) !== -1;
}

function checkCookie(req, res, next) {

    if (req.method === 'OPTIONS') {
        next();
    }
    else {

        // expired and is not a login request
        if (!req.session.loggedin && !isLoginRequest(req.originalUrl)) {
            res.statusCode = 401;
            res.send('Session expired, please login again');
        }

        // submit register form without a userId
        if (req.originalUrl === '/auth/signup/submit' && !req.session.encryptedId) {
            res.statusCode = 401;
            res.send('Unauthorized to perform this action');
        }

        // not expired or is login request, pass
        else {

            // if not a login request, reset a field to reset the expire time
            if (!isLoginRequest(req.originalUrl)) {
                req.session.spinner = !req.session.spinner;
            }
            next();
        }
    }
}

export default checkCookie;