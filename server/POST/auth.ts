const express = require('express');
const router = express.Router();

import sendEmail from '../Service/email';
import * as mysqlUser from '../Database/MySql/user';

router.post('/signin', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        await mysqlUser.login(email, password);
    } catch (error) {
        res.send('/signin 1');
    }

    req.session.loggedin = true;
    res.send({OK: true});
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

            // set encrypted Id for submit register
            console.log("encryptedId set: ", result.id, req.method, req.originalUrl);
            req.session.encryptedId = result.id;
            res.send({OK: true});
        }
        else {
            res.send('/signup 1');
        }
    } catch (error) {
        if (error.code === 'ER_DUP_EMAIL') {
            res.send({code: 'ER_DUP_EMAIL'});
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
    }

    req.session.encryptedId = null;
    req.session.loggedin = true;
    res.send({OK: true});
});

export default router;