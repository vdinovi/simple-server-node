var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var url = require('url');
var server = express();

server.use(bodyParser.json());

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'simple',
    password: 'vd12345!',
    database: 'simpledb'
});
conn.connect();

function getError(req, res) {
    if (err) {
        console.log(err);
        res.status(err.status).end();
    }
    else {
        console.log('Sent: ', filename);
    }
}

server.post('/user', (req, res) => {
    if (req.body.usr && req.body.pass && req.method == 'POST') {
        var query =
            "SELECT * FROM usr_auth WHERE usrname='"+req.body.usr
             +"' and password='"+req.body.pass+"';";
        var userExists = true;
        conn.query(query, (err, row, fields) => {
            if (err) throw err;
            if (row.length) 
                console.log('User already exists');
            else {
                query =
                    "INSERT INTO usr_auth VALUES('"
                     +req.body.usr+"','"+req.body.pass+"');";
                conn.query(query, (err, row, fields) => {
                    if (err) throw err;
                    console.log("Added '"+req.body.usr+"' to database");
                });
            }
        });
    }
    res.send();
});

/*server.get('/user', (req, res) => {
    //authenticate user
});

server.get('/user/:id', (req, res) => {
    query =
        "SELECT * FROM usr_auth WHERE usrname='"+req.body.usr
         +"' and password='"+req.body.pass+"';";
    console.log(
});*/

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html', (err) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent: index.html');
        }
    });
});

server.get('/:filename', (req, res)=> {
    var filename = req.params.filename;
    res.sendFile(filename, {root: __dirname + '/public/'}, (err) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent: ', filename);
        }
    });
});


server.listen(3030);
