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
    let UserAId = 1;
    let UserBId = 2;
    let content = 'test message';
    let skip = 0;
    let limit = 100;

    for (let i = 0; i < 100; i++) {

        if (i % 2) {
            UserBId = 1;
            UserAId = 2;
        }
        else {
            UserAId = 1;
            UserBId = 2;
        }

        let timestamp = moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss');

        await new Promise<any>((resolve, reject) => {
            mysqlConnection.query(`insert into MESSAGE (timestamp, content) values ("${timestamp}", "${content}")`,
                (error, results) => {
                    if (error) {
                        console.log('insert Message error: ', error);
                        reject(error);
                    }
                    else {
                        console.log('insert Message succeed: ', results);
                        resolve(results.insertId);
                    }
                })
        }).then((insertId) => {
            mysqlConnection.query(`insert into CHAT (fromUserId, toUserId, messageId) 
        values (${UserAId}, ${UserBId}, ${insertId})`,
                (error, results) => {
                    if (error) {
                        console.log('insert into chat error: ', error);
                        throw(error);
                    }
                    else {
                        console.log('insert into chat succeed: ', results);
                        return;
                    }
                })
        });
    }

}

setTimeout(() => main(), 1000);