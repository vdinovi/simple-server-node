var crypto = require('crypto');

var auth = function(db) {
    this.db = db;
};

// Adds user to database
//  - Hashes a unique user ID as hex-str of length 10.
//  - TODO: Should be POST(usrname, pass, info...)
//  - TODO: Currently only checks that username and password are not null.
//          Decide on more effective constraints.
auth.prototype.addUser = function(req, res, info) {
    if (!info.username || !info.password) {
        res.writeHead(400, "Invalid username or password");
        res.send();
    }
    var md5hash = crypto.createHash('md5');
    md5hash.update(info.username);
    var uid = md5hash.digest('hex').substr(0, 10);
    this.db.query("INSERT INTO usr_auth VALUES('"
            + info.username + "', '"
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
                        res.statusCode = 500;
                    }
                }
                else {
                    res.writeHead(200, "Account created for "+info.username);
                    console.log('Successfully added user: '+info.username);
                }
                res.send();
            });
};

// Retreive user by UID
// TODO: Fetch usr_info data, currently fetches username
auth.prototype.getUser = function(req, res, info) {
    this.db.query("SELECT * FROM usr_auth WHERE uid = '"+info.uid+"';",
            function(err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.statusCode = 500;
                }
                else if (rows.length == 0) {
                    res.writeHead(404, "User not found");
                }
                else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.write('User: ' + rows[0].username);
                }
                res.send();
            });
};

module.exports = auth;
