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
    let UserAId = 99;
    let UserBId = 98;
    let content = 'test message A to B';
    let skip = 0;
    let limit = 100;
    let date = new Date();

    let timestamp = moment(date).utc().format('YYYY-MM-DD HH:mm:ss');

    console.log(timestamp);

    return new Promise<any>((resolve, reject) => {
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
    });
}

setTimeout(() => main(), 1000);