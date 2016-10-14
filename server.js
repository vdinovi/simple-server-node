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

// User Auth
server.use('/user', function(req, res, next) {
    var info = req.body;
    if (req.method == 'GET') usrAuth.getUser(req, res, info);
    else if (req.method == 'POST') usrAuth.addUser(req, res, info);
});

server.listen(3030);
