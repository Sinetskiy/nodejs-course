// task #1

const express = require('express');
const app = express();


app.get('/', function (req, res) {
    const moment = require('moment');
    const timerId = setInterval(() => console.log(moment().utc()), process.env.INTERVAL);
    setTimeout(()  => {
        clearInterval(timerId);
        res.send(moment().utc());
    }, process.env.TIMEOUT);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
