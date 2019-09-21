const express = require('express');
const router = express.Router();

import sendEmail from '../Service/email';
import * as mysqlUser from '../Database/MySql/user';

router.post('/signin', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let result;

    try {
        result = await mysqlUser.login(email, password);
    } catch (error) {
        res.send('/signin 1');
        return;
    }

    console.log(result);

    if (result.auth) {
        try {
            const userId = await mysqlUser.getUserId(email);
            req.session.encryptedId = userId;
            req.session.loggedin = true;
            res.send({OK: true, userId: userId});
        } catch (error) {
            res.send('/signin 2');
            return;
        }
    }
    else {
        res.send('/signin 3');
    }
});

router.post('/signup', async (req, res) => {
    const to:string = req.body.email;
    const subject:string = "One more step needed";
    const text:string = "Thank you for registering for GMS!\nClick the link below to finish the signup:\n\n"
        + process.env.clientHost + "/signup";

    try {
        await mysqlUser.createUser(to);
        const userId = await mysqlUser.getUserId(to);
        if (userId !== null) {
            await sendEmail(to, subject, text);
            await mysqlUser.createOnline(userId);

            // set encrypted Id for submit register
            req.session.encryptedId = userId;
            res.send({OK: true});
        }
        else {
            res.send('/signup 1');
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.send({code: 'ER_DUP_ENTRY'});
        }
        else if (error.code === 'EENVELOPE') {
            res.send({code: 'BAD_EMAIL'});
        }
        else {
            res.send('/signup 2');
        }
    }
});

router.post('/signup/submit', async (req, res) => {
    const id = req.session.encryptedId;
    const nickname = req.body.nickname;
    const password = req.body.password;

    try {
        await mysqlUser.setNickname(id, nickname);
        await mysqlUser.setPassword(id, password);
    } catch (error) {
        res.send('/signup/submit 1');
        return;
    }

    req.session.loggedin = true;
    res.send({OK: true});
});

router.post('/signout', async (req, res) => {
    const userId = req.session.encryptedId;

    try {
        await mysqlUser.setOffline(userId);
    } catch (error) {
        res.send('/signout 1');
        return;
    }

    req.session.encryptedId = null;
    req.session.loggedin = false;
    res.send({OK: true});
});

router.post('/online', async (req, res) => {
    const userId = req.session.encryptedId;

    try {
        await mysqlUser.setOnline(userId);
    } catch (error) {
        res.send('/online 1');
        return;
    }
    res.send({OK: true});
});

router.post('/offline', async (req, res) => {
    const userId = req.session.encryptedId;

    try {
        await mysqlUser.setOffline(userId);
    } catch (error) {
        res.send('/offline 1');
        return;
    }
    res.send({OK: true});
});

export default router;