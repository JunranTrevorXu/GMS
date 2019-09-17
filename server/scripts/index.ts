require("dotenv").config();
import mysqlConnection from '../Database/MySql/index';
import * as user from "../Database/MySql/user";

mysqlConnection.connect((error) => {
    if (error) {
        console.error('mysql connecting: error' + error.stack);
    }
    else {
        console.log('mysql connected as id ' + mysqlConnection.threadId);
    }
});

async function main() {
    const result = await user.getUserInfo(98);
    console.log(result);
}

setTimeout(() => main(), 1000);