const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : process.env.mysqlHost,
    user     : process.env.mysqlUsername,
    password : process.env.mysqlPassword,
    database : process.env.mysqlDatabase
});

export default connection;