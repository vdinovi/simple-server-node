var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var server = express();

var hash = crypto.createHash('sha-1');

server.use(bodyParser.json());
server.use(express.static('public'));

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'simple',
    password: 'vd12345!',
    database: 'simpledb'
});
conn.connect();

server.get('/user/signup', (req, res) => {
    hash.update(
    var uid = 
});

server.get('/user/login', (req, res) => {

});


server.listen(3030);
