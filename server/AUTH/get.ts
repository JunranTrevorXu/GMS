const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

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

export default router;