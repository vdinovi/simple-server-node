var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var db = require('./bin/db.js');

var server = express();

server.use(bodyParser.json());
server.use(express.static('public'));

var DBconn = function() {
    this.conn = null;
};

var conn = new db();
conn.query('test');

server.listen(3030);
