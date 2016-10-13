var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// Custom modules
var db = require('./bin/db.js');

// Setup and config server
var server = express();
server.use(bodyParser.json());
server.use(express.static('public'));
var db = require('./bin/db.js');
var dbconn = new db();




server.listen(3030);
