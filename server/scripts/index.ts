require("dotenv").config();
import mysqlConnection from '../Database/MySql/index';
import * as mysqlUser from "../Database/MySql/user";
import webpush from '../Service/webpush';

mysqlConnection.connect((error) => {
    if (error) {
        console.error('mysql connecting: error' + error.stack);
    }
    else {
        console.log('mysql connected as id ' + mysqlConnection.threadId);
    }
});

async function main() {
    //web push
    const subscribeData = await mysqlUser.getSubscribe(98);
    const pushSubscriptionObj = {
        endpoint: subscribeData.endpoint,
        keys: {
            auth: subscribeData.auth,
            p256dh: subscribeData.p256h,
        }
    };
    webpush.sendNotification(pushSubscriptionObj, 'new friend request');
}

setTimeout(() => main(), 1000);