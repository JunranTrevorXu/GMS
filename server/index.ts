import express = require('express');
import cookieSession = require('cookie-session');

import applyMiddleWare from './Middleware/index';

import applyPostRouters from './POST/index';

const app = express();
const port: number = 1994;

app.use(cookieSession({
    name: 'GMS-session',
    keys: ['Junran', 'Ace'],
    maxAge: 10 * 1000
}));

applyMiddleWare(app);

applyPostRouters(app);

app.listen(port, () => console.log('listening in port ', port));