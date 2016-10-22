var crypto = require('crypto');
var session = require('./session.js');

var auth = function(db, sessionMap) {
    this.db = db;
    this.sessionMap = sessionMap;
};

// Set 5 minute expire time for any session created
auth.prototype.setExpire = function(token) {
    var session = this.sessionMap[token];
    if (session) 
        setTimeout(session.expire, 300000, session);
};

// Resolve token to session
// - If session has not expired, server may operate on assocaited UID
auth.prototype.validateToken = function(token) {
    var session = this.sessionMap[token];
    if (session && !session.expired) {
        return session;
    }
    return false;
};

auth.prototype.login = function(req, res, info) {
    if (!info.username || !info.password) {
        res.writeHead(400, "Invalid username or password");
        res.send();
        return;
    }
    var self = this;
    this.db.query(
        "SELECT * FROM usr_auth WHERE username = '"+info.username+"';",
        function(err, rows, fields) {
            if (err) {
                res.writeHead(500);
            }
            else if (rows.length == 0) {
                res.writeHead(404, "User not found");
            }
            else {
                if (rows[0].password == info.password) {
                    var uid = rows[0].uid;
                    var token = crypto.randomBytes(20).toString('hex');
                    self.sessionMap[token] = new session(token, uid);
                    self.setExpire(token);
                    res.cookie('session', token);
                    res.writeHead(200, {
                        "Content-Type": "text/plain",
                    });
                }
                else {
                    res.writeHead(400, "Invalid username or password");
                }
            }
            res.send();
        });
};

// Adds user to database
//  - Hashes a unique user ID as hex-str of length 10.
//  - TODO: Currently only checks that username, email and password are not null.
//          Decide on more effective constraints.
auth.prototype.addUser = function(req, res, info) {
    if (!info || !info.email || !info.username || !info.password
        || !info.confirmPass || info.password != info.confirmPass) {
        res.writeHead(400, "Invalid username or password");
        res.send();
        return;
    }
    var md5hash = crypto.createHash('md5');
    md5hash.update(info.username);
    var uid = md5hash.digest('hex').substr(0, 10);
    this.db.query("INSERT INTO usr_auth VALUES('"
            + info.username + "', '"
            + info.email + "', '"
            + info.password + "', '"
            + uid + "');",
            function(err, rows, fields) {
                if (err) {
                    // User already exists
                    if (err.code == 'ER_DUP_ENTRY') {
                        res.writeHead(409, "User already exists");
                    }
                    // Server error;
                    else {
                        res.writeHead(500);
                    }
                }
                else {
                    res.writeHead(200, "Account created for "+info.username);
                    console.log('Successfully added user: '+info.username);
                }
                res.send();
            });
};

// Retreive user by UID or username
auth.prototype.getUser = function(req, res, info) {
    if (info.id) {
        var str = "SELECT * FROM usr_auth WHERE uid = '"+id+"';";
                   + info.id + "';";
    }
    else if (info.username) { 
        var str = "SELECT * FROM usr_auth WHERE username = '"
                   + info.username + "';";
    }
    else {
        res.writeHead(400);
        res.send();
        return;
    }
    this.db.query(str,
        function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.writeHead(500);
            }
            else if (rows.length == 0) {
                res.writeHead(404, "User not found");
                res.write('User not found');
            }
            else {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write('User: ' + rows[0].username);
            }
            res.send();
        });
};

module.exports = auth;
