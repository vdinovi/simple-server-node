var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

// Custom modules
var dbModule = require('./bin/db.js');
var authModule = require('./bin/auth.js');
var profileModule = require('./bin/profile.js');
var chatModule = require('./bin/chat.js');

//Init
var app = express();
var server = http.createServer(app);

// Setup and config server
app.use(express.static('public'));
var jsonParser = bodyParser.json(); 
var sessionMap = {};
var db = new dbModule();
var auth = new authModule(db, sessionMap);
var profile = new profileModule(db, sessionMap);
var chat = new chatModule(server, auth);

// User Profile:
// - /profile GET(token) -> Render user profile
// TODO:- /profile POST(token) -> Edit user profile?
app.use('/profile', jsonParser, function(req, res, next) {
    switch (req.path) {
    case '/':
        if (req.method == 'GET') profile.render(req, res, auth);
        break;
    default:
        res.writeHead(400);
        res.send();
        break;
    }
});

// Chat Handler
// '/' - GET -> User wishes to enter chat. 
//              * Open a socket for user and send them current data
/*app.use('/chat', jsonParser, function(req, res, next) {
});*/

// User Auth:
//  - /login  POST(username, password) -> Authenticate user
//  - /signup POST(email, username, password, confirm-pass) -> Create new user
//  - /   GET(UID || username) -> retreive public user information 
app.use('/user', jsonParser, function(req, res, next) {
    var info = req.body;
    switch (req.path) {
    case '/':
        if (req.method == 'GET') auth.getUser(req, res,
             {id: req.query.id, username: req.query.username});
        break;
    case '/login':
        if (req.method == 'POST') auth.login(req, res, info);
        break;
    case '/signup':
        if (req.method == 'POST') auth.addUser(req, res, info);
        break;
    default:
        res.writeHead(400);
        res.send();
        break;
    }
});

server.listen(3030);
