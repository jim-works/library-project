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
    console.log([req.body.Ssn, req.body.First_name, req.body.Bname, req.body.Email, req.body.Address, req.body.City, req.body.State, req.body.Phone]);
    con.query("select max(card_id)+1 as id from borrower;", (error, results, fields) => {
        const id = results[0].id;
        con.query("insert into borrower (SSN, first_name, bname, email, address, city, state, phone, card_id) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?);",
            [req.body.Ssn, req.body.First_name, req.body.Bname, req.body.Email, req.body.Address, req.body.City, req.body.State, req.body.Phone, id],
            function (error, results, fields) {
                if (error) console.log(error);
                if (error.code = 'ER_DUP_ENTRY') {
                    res.status(400).send("duplicate ssn");
                    return;
                }
                res.status(201).json(req.body);
            });
    })


})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});