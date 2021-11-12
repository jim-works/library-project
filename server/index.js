const express = require('express');
const mysql = require('mysql')

const app = express();
const port = 3001;
var connected = false;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "sys",
});
con.connect((err) => {
    if (err) throw err;
    console.log("connected!");
    connected = true;

});

app.get('/api/:query', (req, res) => {
    if (!connected) { res.status(500).send("not yet connected, try refreshing!"); return; }

    con.query(req.params.query, (err, result) => {
        if (err) {
            console.log(err);
            return;
        };
        res.send(result);
    });
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});