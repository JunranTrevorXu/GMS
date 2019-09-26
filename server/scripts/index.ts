require("dotenv").config();
import mysqlConnection from '../Database/MySql/index';
import * as mysqlUser from "../Database/MySql/user";
import webpush from '../Service/webpush';
const moment = require('moment');

console.log("env: ", process.env.mysqlHost);

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
    let fromUserId = 99;
    let toUserId = 99;
    let content = 'test message';
    let skip = 0;
    let limit = 100;

    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(`select * from MESSAGE inner join CHAT on MESSAGE.id = CHAT.messageId
        where CHAT.fromUserId = ${fromUserId} and CHAT.toUserId = ${toUserId} 
        order by MESSAGE.timestamp desc limit ${skip}, ${limit}`,
            (error, results) => {
                if (error) {
                    console.log('fetch message error: ', error);
                    reject(error);
                }
                else {
                    console.log('fetch message succeed: ', results);
                    resolve(results);
                }
            });
    });
}

setTimeout(() => main(), 1000);