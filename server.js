// Standard modules
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

// Custom modules
var dbModule = require('./bin/db.js'); // MySQL Database wrapper
var authModule = require('./bin/auth.js'); // User authorization
var userModule = require('./bin/user.js'); // User action handler
var profileModule = require('./bin/profile.js'); // Profile renderer
var chatModule = require('./bin/chat.js'); // Chat system using socket.io

// Server setup & config
var app = express();
var server = http.createServer(app);
app.use(express.static('public')); // use public to server static files
app.use(cookieParser()); // use cookie parser
app.use(bodyParser.json()); // use json parser

// Globals
var sessionMap = {}; // Map for user sessions

// File init
if (!fs.existsSync(__dirname + '/users'))
    fs.mkdirSync(__dirname + '/users');

// Module init
var db = new dbModule(); 
var auth = new authModule(db, sessionMap);
var user = new userModule(auth, sessionMap, __dirname);
var profile = new profileModule(db, sessionMap);
var chat = new chatModule(server, sessionMap);

// ---------- Middleware ----------
// *** User Profile ***
//  - /profile GET(token) -> Render user profile
//  TODO:- /profile POST(token) -> Edit user profile?
app.use('/profile', function(req, res, next) {
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

// *** User Auth ***
//  - /login  POST(username, password) -> Authenticate user
//  - /signup POST(email, username, password, confirm-pass) -> Create new user
//  - /   GET(UID || username) -> retreive public user information 
app.use('/user', function(req, res, next) {
    var info = req.body;
    switch (req.path) {
    case '/':
        if (req.method == 'GET') auth.getUser(req, res,
             {id: req.query.id, username: req.query.username});
        break;
    case '/validate':
        if (req.method == 'GET') {
            if (auth.validateToken(req.cookies.session)) res.writeHead(200);
            else res.writeHead(400);
            res.send();
        }
        break;
    case '/login':
        if (req.method == 'POST') auth.login(req, res, info);
        break;
    case '/signup':
        if (req.method == 'POST') auth.addUser(req, res, info);
        break;
    case '/upload':
        if (req.method == 'POST') user.upload(req, res);
        break;
    case '/file':
        if (req.method == 'GET') user.getFile(req, res);
        break;
    default:
        res.writeHead(400, "Bad endpoint");
        res.send();
        break;
    }
});

server.listen(8081);
