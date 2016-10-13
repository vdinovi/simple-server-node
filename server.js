var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// Custom modules
var db = require('./bin/db.js');
var auth = require('./bin/auth.js');

// Setup and config server
var server = express();
server.use(bodyParser.json());
server.use(express.static('public'));

var dbconn = new db();
var usrAuth = new auth(dbconn);

server.use('/user', function(req, res, next) {
    var info = {'username': 'usr2', 'password': 'pass'};
    try {
        switch (req.method) {
        case 'GET':
            usrAuth.getUser(req, res, info);
            break;
        case 'POST':
            usrAuth.addUser(req, res, info);
            break;
        }
    } catch(err) {
        console.log(err);
    }
    next();
});

server.listen(3030);
