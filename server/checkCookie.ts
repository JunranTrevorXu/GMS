function checkCookie(req, res, next) {
    // expired
    if (req.session.isNew) {
        req.session.spinner = true;
        res.send('please login');
    }
    // not expired, reset a field to reset the expire time
    else {
        req.session.spinner = !req.session.spinner;
        next();
    }
}

export default checkCookie;