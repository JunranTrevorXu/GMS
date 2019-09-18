const express = require('express');
const router = express.Router();
import webpush from '../Service/webpush';

import * as mysqlUser from '../Database/MySql/user';

router.post('/sendFriendRequest', async (req, res) => {
    const fromUserId = req.session.encryptedId;
    const toUserEmail = req.body.toUserEmail;

    try {
        const toUserId = await mysqlUser.getUserId(toUserEmail);
        await mysqlUser.sendFriendRequest(fromUserId, toUserId);

        //web push
        const subscribeData = await mysqlUser.getSubscribe(toUserId);
        const pushSubscriptionObj = {
            endpoint: subscribeData.endpoint,
            keys: {
                auth: subscribeData.auth,
                p256dh: subscribeData.p256h,
            }
        };
        webpush.sendNotification(pushSubscriptionObj, 'new friend request');
    } catch (error) {
        res.send('./sendFriendRequest 1');
        return;
    }

    res.send({OK: true});
});

router.post('/acceptFriendRequest', async (req, res) => {
    const toUserId = req.session.encryptedId;
    const fromUserId = req.body.fromUserId;

    try {
        await mysqlUser.acceptFriendRequest(fromUserId, toUserId);
        await mysqlUser.addFriend(fromUserId, toUserId);

        //web push
        const subscribeData = await mysqlUser.getSubscribe(fromUserId);
        const pushSubscriptionObj = {
            endpoint: subscribeData.endpoint,
            keys: {
                auth: subscribeData.auth,
                p256dh: subscribeData.p256h,
            }
        };
        webpush.sendNotification(pushSubscriptionObj, 'friend request accepted');
    } catch (error) {
        res.send('./acceptFriendRequest 1');
    }

    res.send({OK: true});
});

router.post('/subscribe', async (req, res) => {
    const userId = req.session.encryptedId;
    const { endpoint, p256dh, auth } = req.body;

    try {
        let { endpointId } = await mysqlUser.getEndpointId(endpoint);
        const oldEndpoint = await mysqlUser.getSubscribe(userId);

        if (!endpointId)
            endpointId = await mysqlUser.setEndpoint(endpoint, p256dh, auth);

        // no action needed
        if (oldEndpoint && endpointId == oldEndpoint.id) {
            res.send({OK: true});
            return;
        }

        const occupied = await mysqlUser.checkEndpointOccupation(endpointId);

        if (!occupied) {
            if (oldEndpoint) {
                // update old subscribe
                await mysqlUser.updateSubscribe(userId, endpointId);
            }
            else {
                // create new subscribe
                await mysqlUser.subscribe(userId, endpointId);
            }
        }
        else {
            if (oldEndpoint) {
                // remove old subscribe
                await mysqlUser.removeSubscribe(userId);
            }
            // preempt other's subscribe
            await mysqlUser.preemptSubscribe(userId, endpointId);
        }
    } catch (error) {
        res.send('./subscribe 1');
    }

    res.send({OK: true});
    return;
});

export default router;