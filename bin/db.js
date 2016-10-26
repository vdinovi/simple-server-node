var mysql = require('mysql');

//  DATABASE SCHEMA
/********************************************************
 * USR_AUTH:
 *  - username(vc[20]): PK for this table
 *  - email(vc[20]): associated email
 *  - password(vc[20]): for validation
 *  - uid(c[10]): Hashed 10-char TODO:hex value used as FK
 *                for other user related tables
 *
 * USR_INFO(REMOVE?):
 *  - uid(c[10]): PK 10-char TODO:hex value for this table
 *  - name(vc[20]): Real user name
 *  - email(vc[20]): User email
 * ******************************************************/

const info = {
    host: 'simpledb.chfwru12q1ji.us-west-1.rds.amazonaws.com',
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
db.prototype.query = function(str, callback) {
    this.conn.query(str, callback); 
};

module.exports = db;
