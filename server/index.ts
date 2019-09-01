const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require("dotenv").config();

import mysqlConnection from './Database/MySql/index';
import applyMiddleWare from './Middleware/index';
import applyAuthRouters from './AUTH/index';

const app = express();
const port:number = parseInt(process.env.port);

mysqlConnection.connect((error) => {
    if (error) {
        console.error('mysql connecting: error' + error.stack);
    }
    else {
        console.log('mysql connected as id ' + mysqlConnection.threadId);
    }
});

// middlewares

app.use(cookieSession({
    name: 'GMS-session',
    keys: ['Junran', 'Ace'],
    maxAge: 5 * 60 * 1000
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", process.env.clientHost);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// customized middlewares and handlers

applyMiddleWare(app);
applyAuthRouters(app);

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(port, () => console.log('listening in port ', port));