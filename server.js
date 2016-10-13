var express = require('express');
//var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// Custom modules
var db = require('./bin/db.js');

// Setup and config server
var server = express();
server.use(bodyParser.json());
server.use(express.static('public'));
// Connect to database
var db = require('./bin/db.js');
var dbconn = new db();

// Routing modules should be hooked up here
// server.use('/user', ...) for login & signup operations
// server.use(



server.listen(3030);
