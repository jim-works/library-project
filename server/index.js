const express = require('express');
const mysql = require('mysql')

const app = express();
app.use(express.json());
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

app.get('/api/query/:query', (req, res) => {
    if (!connected) { res.status(500).send("not yet connected, try refreshing!"); return; }

    con.query(req.params.query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Bad sql query");
        };
        res.send(result);
    });
})

app.post('/api/createBorrower', (req, res) => {
    if (!connected) { res.status(500).send("not yet connected, try refreshing!"); return; }
    res.status(201).json(req.body);
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});