import express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // TODO
    req.session.spinner = true;
    res.send('loged in');
});

export default router;