require("dotenv").config();
import mysqlConnection from '../Database/MySql/index';
import * as mysqlUser from "../Database/MySql/user";
import webpush from '../Service/webpush';

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
        mysqlConnection.query(`insert into test values (22);`,
            (error, results) => {
                if (error) {
                    console.log('create user error: ', error);
                }
                else {
                    console.log('create user succeed: ', results);
                }
            });
}

setTimeout(() => main(), 1000);