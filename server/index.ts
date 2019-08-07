import express = require('express');

const app = express();
const port = 1994;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => console.log('listening in port ', port));