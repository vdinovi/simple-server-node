var cookie = require('cookie');
var multiparty = require('multiparty')
var util = require('util');

var user = function(auth) {
    this.auth = auth; 
};

user.prototype.resolve = function(req) {
    return auth.validateToken(cookie.parse(req.headers.cookie));
};

user.prototype.parseFile = function(req, res, callback) {
    var form = new multiparty.form();
    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });
    form.on('part', function(part) {
        callback(name, file);
    }); 
};

user.prototype.profilePic = function(req, res) {
    var session;
    if (!(session = this.resolve(req))) {
        res.write(400, "Bad session token");
        res.send();
    }
    var path = "users/" + session.uid;
    this.parseFile(req, res, function(name, file) {
        if (!name.includes(".jpg")) {
            res.writeHead(400, "Bad filetype");
        }
        else {
            fs.writeFile(path + "/profile.jpg", file, (err) => {
                if (err) {
                    console.log(err);
                    res.write(500, "Failed to write file");
                }
                else {
                    console.log("Profile pic updated for: " + session.username);
                    res.write(200, "Profile pic updated");
                }
            });
        }
        res.send();
    });
};

module.exports = user;
