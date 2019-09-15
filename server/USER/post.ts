const express = require('express');
const router = express.Router();

import * as mysqlUser from '../Database/MySql/user';

router.post('/sendFriendRequest', async (req, res) => {
    const fromUserId = req.session.encryptedId;
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

router.post('/acceptFriendRequest', async (req, res) => {
    const toUserId = req.session.encryptedId;
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

router.post('/subscribe', async (req, res) => {
    const userId = req.session.encryptedId;
    const { endpoint, p256dh, auth } = req.body;

    try {
        let { endpointId } = await mysqlUser.getEndpointId(endpoint);
        if (!endpointId) {
            endpointId = await mysqlUser.setEndpoint(endpoint, p256dh, auth);
            const oldEndpointId = await mysqlUser.getSubscribe(userId);
            oldEndpointId ?
                await mysqlUser.updateSubscribe(userId, endpointId)
                : await mysqlUser.subscribe(userId, endpointId);
        }
        else {
            await mysqlUser.preemptSubscribe(userId, endpointId);
        }
        res.send({OK: true});
    } catch (error) {
        res.send('./subscribe 1');
    }
});

export default router;