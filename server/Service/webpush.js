"use strict";
exports.__esModule = true;
var webpush = require('web-push');
var vapidKeys = {
    publicKey: process.env.vapidKeyPublic,
    privateKey: process.env.vapidKeyPrivate
};
webpush.setVapidDetails('mailto:trevorjr118@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);
exports["default"] = webpush;
