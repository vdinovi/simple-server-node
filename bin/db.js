var mysql = require('mysql');

const info = {
    host: 'localhost',
    user: 'simple',
    password: 'vd12345!',
    database: 'simpledb'
};

// Connects to database on construction
var db = function () {
    this.conn = mysql.createConnection(info);
};

// Manual connection
// should only be used if re-connect after disconnect is desired
db.prototype.connect = function() {
    if (this.conn == null) {
        this.conn = mysql.createConnection(info);
    }
};

// Disconnect from database
db.prototype.disconnect = function() {
    this.conn.disconnect();
};

// Query the database
// TODO: NYI
db.prototype.query = function(str) {
    console.log('NOT YET IMPLEMENTED');
};

module.exports = db;
