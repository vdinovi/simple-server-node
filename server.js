var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// Custom modules
var db = require('./bin/db.js');
var auth = require('./bin/auth.js');
var jsonParser = bodyParser.json()

// Setup and config server
var server = express();
server.use(express.static('public'));

var dbconn = new db();
var usrAuth = new auth(dbconn);

// User Auth:
//  - /login  POST(username, password) -> Authenticate user
//  - /signup POST(email, username, password, confirm-pass) -> Create new user
//  - TODO:/user   GET(username | UID) -> retreive public user information 
server.use('/user', jsonParser, function(req, res, next) {
    var info = req.body;
    switch (req.path) {
    case '/login':
        if (req.method == 'POST') usrAuth.login(req, res, info);
        break;
    case '/signup':
        if (req.method == 'POST') usrAuth.addUser(req, res, info);
        break;
    default:
        res.writeHead(400);
        res.send();
        break;
    }
});

server.listen(3030);
