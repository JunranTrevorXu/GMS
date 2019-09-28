const app = require('express')();
const server = require('http').createServer(app);
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require("dotenv").config();

import mysqlConnection from './Database/MySql/index';
import applyMiddleWare from './Middleware/index';
import applyAuthRouters from './AUTH/index';
import applyUserRouters from './USER/index';
import applyChatRouters from './CHAT/index';

import attachWebSocketServer from './WebSocket/ws';

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
    maxAge: 60 * 60 * 1000
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
applyUserRouters(app);
applyChatRouters(app);

app.get('/', (req, res) => {
    res.send("hello");
});

attachWebSocketServer(server);

server.listen(port, function(){
    console.log('listening on ', port);
});
