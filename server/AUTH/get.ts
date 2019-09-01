const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        OK: true,
        isLoggedIn: req.session.loggedin
    });
});

export default router;