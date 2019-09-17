const express = require('express');
const router = express.Router();

import * as mysqlUser from '../Database/MySql/user';

router.get('/', async (req, res) => {
    const userId = req.session.encryptedId;

    try {
        const result = await mysqlUser.getUserInfo(userId);
        res.send({OK: true, email: result.email, nickname: result.nickname});
    } catch (error) {
        res.send('/ 1');
    }
});

router.get('/friendRequest', async (req, res) => {
    const userId = req.session.encryptedId;

    try {
        const requestList = await mysqlUser.getFriendRequest(userId);
        res.send({OK: true, requestList});
    } catch (error) {
        res.send('/friendRequest 1');
    }
});

router.get('/friend', async (req, res) => {
    const userAId = req.session.encryptedId;

    try {
        const friendList = await mysqlUser.getFriend(userAId);
        res.send({OK: true, friendList});
    } catch (error) {
        res.send('/friend 1');
    }
});

export default router;