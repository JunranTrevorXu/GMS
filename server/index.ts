const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require("dotenv").config();

import mysqlConnection from './Database/MySql/index';
import applyMiddleWare from './Middleware/index';
import applyAuthRouters from './AUTH/index';
import applyUserRouters from './USER/index';

const port:number = parseInt(process.env.port);

var user_socket_map = {};

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

app.get('/', (req, res) => {
    res.send("hello");
});

// ws socket handlers

io.on('connection', (socket) => {
    socket.on('register', ({ userId }) => {
        console.log("register", userId);
        user_socket_map[userId] = socket.id;
    });

    socket.on('typing', ({ fromUserId, toUserId }) => {
        if (user_socket_map[toUserId]) {
            io.to(user_socket_map[toUserId]).emit('typing', { fromUserId });
        }
    });

    socket.on('message', ({ fromUserId, toUserId, message }) => {
        if (user_socket_map[toUserId]) {
            io.to(user_socket_map[toUserId]).emit('message', { fromUserId, message });
        }
    });
});

server.listen(port, function(){
    console.log('listening on ', port);
});

app.listen(port, () => console.log('listening in port ', port));

console.log('\x1b[33m%s\x1b[0m', 'interesting!');
