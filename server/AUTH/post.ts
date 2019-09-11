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

    if (result.auth) {
        try {
            result = await mysqlUser.getUserId(email);
            await mysqlUser.setOnline(result.id);
            req.session.encryptedId = result.id;
            req.session.loggedin = true;
            res.send({OK: true});
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
        const result = await mysqlUser.getUserId(to);
        if (result.id !== null) {
            await sendEmail(to, subject, text);
            await mysqlUser.createOnline(result.id);

            // set encrypted Id for submit register
            req.session.encryptedId = result.id;
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
        await mysqlUser.setOnline(id);
    } catch (error) {
        res.send('/signup/submit 1');
        return;
    }

    req.session.loggedin = true;
    res.send({OK: true});
});

router.post('./signout', async (req, res) => {
    const userId = req.body.userId;

    try {
        await mysqlUser.logout(userId);
    } catch (error) {
        res.send('/signout 1');
        return;
    }

    req.session.encryptedId = null;
    req.session.loggedin = false;
    res.send({OK: true});
});

export default router;