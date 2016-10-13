var crypto = require('crypto');
var md5hash = crypto.createHash('md5');

var auth = function(db) {
    this.db = db;
};

auth.prototype.addUser = function(req, res, info) {
    md5hash.update(info.username);
    var uid = md5hash.digest('hex').substr(0, 9) 
    this.db.query("INSERT INTO usr_auth VALUES('"
                   + info.username + "', '"
                   + info.password + "', '"
                   + uid + "');",
    function(err, rows, fields) {
        if (err) throw new Error(err.message);
        console.log('Successfully added user: '+info.username);
    });
};

auth.prototype.getUser = function(req, res, info) {
    this.db.query("SELECT * FROM usr_auth WHERE username = '"+info.username+"';",
    function(err, rows, fields) {
        if (err) throw new Error(err.message);
        console.log(rows[0]);
    });
}

module.exports = auth;
