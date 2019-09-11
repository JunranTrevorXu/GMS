const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    console.log('check auth: ', req.session.loggedin);
    res.send({
        OK: true,
        isLoggedIn: req.session.loggedin
    });
});

export default router;