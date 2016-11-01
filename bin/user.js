var cookie = require('cookie');
var fs = require('fs');
var Busboy = require('busboy');
var util = require('util');

var user = function(auth, sessionMap, serverroot) {
    this.auth = auth; 
    this.sessionMap = sessionMap;
    this.userdir = serverroot + '/users/';
};

user.prototype.resolve = function(req) {
    return this.auth.validateToken(cookie.parse(req.headers.cookie).session);
};

user.prototype.upload = function(req, res) {
    var session = this.resolve(req);
    if (!session) {
        res.writeHead(400, "Missing or expired session token");
        res.send();
        return;
    }
    var path = "users/" + session.uid + '/';
    var busboy = new Busboy({
        headers: req.headers
    });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var outfile = fs.createWriteStream(path + filename, {mode: 0o666});
        file.on('data', function(data) {
            outfile.write(data);
        });
    });
    busboy.on('finish', function() {
        console.log('Finished uploading file for ' + session.username);
        res.writeHead(303, { Connection: 'close'});
        res.end();
    });
    req.pipe(busboy);
};    

user.prototype.getFile = function (req, res) {
    var session = this.resolve(req);
    if (!session) {
        res.writeHead(400, "Missing or expired session token");
        res.send();
        return;
    }
    res.sendFile(this.userdir + session.uid + '/' + req.query.file);
};    



module.exports = user;
