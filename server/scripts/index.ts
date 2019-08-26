require("dotenv").config();
import mysqlConnection from '../Database/MySql/index';
import { createUser, getUserId } from "../Database/MySql/user";

mysqlConnection.connect((error) => {
    if (error) {
        console.error('mysql connecting: error' + error.stack);
    }
    else {
        console.log('mysql connected as id ' + mysqlConnection.threadId);
    }
});

async function main() {
    //await createUser("a@b.com");
    const result = await getUserId("a@b.com");
    console.log(result.id);
}

setTimeout(() => main(), 1000);