require("dotenv").config();
import mysqlConnection from '../Database/MySql/index';
import * as mysqlUser from "../Database/MySql/user";

mysqlConnection.connect((error) => {
    if (error) {
        console.error('mysql connecting: error' + error.stack);
    }
    else {
        console.log('mysql connected as id ' + mysqlConnection.threadId);
    }
});

async function main() {
    for (let i = 0; i < 100; i++) {
    	let id = i + 100;

    	if (id % 4)
    		await mysqlUser.addFriend(id, 98);
    }
}

setTimeout(() => main(), 1000);