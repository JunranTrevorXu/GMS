import * as mysqlUser from "../Database/MySql/user";

const webpush = require('web-push');

const vapidKeys = {
    publicKey: process.env.vapidKeyPublic,
    privateKey: process.env.vapidKeyPrivate,
};

webpush.setVapidDetails(
    'mailto:trevorjr118@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

export default webpush;