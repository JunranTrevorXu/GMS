const express = require('express');
const router = express.Router();

import * as mysqlUser from '../Database/MySql/user';

router.post('/sendFriendRequest', async (res, req) => {
    const fromUserId = req.session.encrypted;
    const toUserEmail = req.body.toUserEmail;

    try {
        const toUserId = await mysqlUser.getUserId(toUserEmail);
        await mysqlUser.sendFriendRequest(fromUserId, toUserId);
    } catch (error) {
        res.send('./sendFriendRequest 1');
        return;
    }

    //web push

    res.send({OK: true});
});

router.post('/acceptFriendRequest', async (res, req) => {
    const toUserId = req.session.encrypted;
    const fromUserId = req.body.fromUserId;

    try {
        await mysqlUser.acceptFriendRequest(fromUserId, toUserId);
        await mysqlUser.addFriend(fromUserId, toUserId);
    } catch (error) {
        res.send('./acceptFriendRequest 1');
    }

    //web push

    res.send({OK: true});
});

export default router;