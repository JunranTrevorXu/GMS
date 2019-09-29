const express = require('express');
const router = express.Router();

import * as mysqlChat from '../Database/MySql/chat';

router.get('/message', async (req, res) => {
    const userAId = req.session.encryptedId;
    const userBId = req.query.friendId;
    const limit = req.query.limit;
    const skip = req.query.skip;

    console.log(limit, skip);

    try {
        let messages = await mysqlChat.fetchMessage(userAId, userBId, limit, skip);
        if (messages.length < limit && messages.length > 0) {
            messages.push({EOC: true});
        }
        res.send({OK: true, messages});
    } catch (error) {
        res.send('/chat/message 1')
    }
});

export default router;