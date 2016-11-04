var cookie = require('cookie');
var fs = require('fs');
var Busboy = require('busboy');
var util = require('util');

var user = function(sessionMap) {
    // Initialize user root
    this.serverRoot = require('../server.js').serverRoot;
    this.userDir = this.serverRoot + '/users/';
    if (!fs.existsSync(this.userDir))
        fs.mkdirSync(this.userDir);
    this.sessionMap = sessionMap;
};

user.prototype.validateToken = function(req) {
    var token = cookie.parse(req.headers.cookie).session;
    var session = this.sessionMap[token];
    if (!session)
        return false;
    if (!session.expired)
        return session;
    return false;
};

user.prototype.upload = function(req, res) {
    var session = this.validateToken(req);
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
    var session = this.validateToken(req);
    if (!session) {
        res.writeHead(400, "Missing or expired session token");
        res.send();
        return;
    }
    var path = this.userDir + session.uid + '/' + req.query.file;
    if (fs.existsSync(path))
        res.sendFile(path);
    else 
        res.sendFile(this.serverRoot + '/public/img/index.png');
};    

user.prototype.initializeUser = function(info, uid) {
    //TODO: Create entry in user info table indexed by UID
    return this.makeUserDir(uid); // Create user dir
};

user.prototype.userDirExists = function(uid) {
    if (fs.existsSync(this.userDir + uid))
        return  true;
    return false; 
};

user.prototype.makeUserDir = function(uid) {
    try {
        fs.mkdirSync(this.userDir + uid);
    } catch(e) {
        console.log(e);
        return false;
    }
    return true;
}

module.exports = user;
