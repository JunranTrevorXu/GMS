import express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('loged in');
});

export default router;