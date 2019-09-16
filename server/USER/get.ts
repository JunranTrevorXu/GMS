const express = require('express');
const router = express.Router();

import * as mysqlUser from '../Database/MySql/user';

router.get('/friendRequest', async (req, res) => {
    const userId = req.session.encryptedId;

    try {
        const requestList = await mysqlUser.getFriendRequest(userId);
        res.send(requestList);
    } catch (error) {
        res.send('/friendRequest 1');
    }
});

router.get('/friend', async (req, res) => {

});

export default router;