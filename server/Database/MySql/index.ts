const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : process.env.mysqlHost,
    port     : process.env.mysqlPort,
    user     : process.env.mysqlUsername,
    password : process.env.mysqlPassword,
    database : process.env.mysqlDatabase
});

export default connection;