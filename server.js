var express = require('express');
var bodyParser = require('body-parser');

// Custom modules
var db = require('./bin/db.js');
var auth = require('./bin/auth.js');
var profile = require('./bin/profile.js');

// Setup and config server
var server = express();
server.use(express.static('public'));
var jsonParser = bodyParser.json()
var sessionMap = {};
var dbConn = new db();
var usrAuth = new auth(dbConn, sessionMap);
var profile = new profile(dbConn, sessionMap);


// User Profile:
// - /profile GET(token) -> Render user profile
// TODO:- /profile POST(token) -> Edit user profile?
server.use('/profile', jsonParser, function(req, res, next) {
    switch (req.path) {
    case '/':
        if (req.method == 'GET') profile.render(req, res, usrAuth);
        break;
    default:
        res.writeHead(400);
        res.send();
        break;
    }
});

var messages = "";

// Chat Handler
server.use('/chat', jsonParser, function(req, res, next) {
    if (req.method == 'POST') {
        var data = messages+'\n'+req.body.message;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(data);
    }
    res.send();
});

// User Auth:
//  - /login  POST(username, password) -> Authenticate user
//  - /signup POST(email, username, password, confirm-pass) -> Create new user
//  - /   GET(UID || username) -> retreive public user information 
server.use('/user', jsonParser, function(req, res, next) {
    var info = req.body;
    switch (req.path) {
    case '/':
        if (req.method == 'GET') usrAuth.getUser(req, res,
             {id: req.query.id, username: req.query.username});
        break;
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
