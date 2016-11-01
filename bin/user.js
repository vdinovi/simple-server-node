var cookie = require('cookie');
var busboy = require('busboy');
var util = require('util');

var user = function(auth, sessionMap) {
    this.auth = auth; 
    this.sessionMap = sessionMap;
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
        outfile.on('open', function() {
            console.log('opening ' + filename + ' for writing');
        });
        file.on('data', function(data) {
            console.log('writing: ' + data);
            outfile.write(data);
        });
        file.on('end', function() {
            console.log('finished writing ' + filename);
            outfile.end();
        });
    });
    busboy.on('finish', function() {
        res.writeHead(303, { Connection: 'close'});
        res.end();

    });
    req.pipe(busboy);
};    
        



module.exports = user;
