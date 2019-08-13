import express = require('express');
import cookieSession = require('cookie-session');

import checkCookie from './checkCookie';

const app = express();
const port = 1994;

app.use(cookieSession({
    name: 'GMS-session',
    keys: ['Junran', 'Ace'],
    maxAge: 10 * 1000
}));

app.use(checkCookie);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => console.log('listening in port ', port));