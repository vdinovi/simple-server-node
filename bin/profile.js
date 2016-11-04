var mustache = require('mustache');

var profile = function(db, sessionMap) {
    this.db = db;
    this.sessionMap = sessionMap;
};

// Resolve token to session
profile.prototype.validateToken = function(token, res) {
    var session = this.sessionMap[token];
    if (!session) {
        res.writeHead(400, "Bad token");
    } 
    else if (session.expired) {
        res.writeHead(400, "Token expired");
    }
    else {
        return session;
    }
    res.send();
    return false;
};

profile.prototype.render = function(req, res) {
    var token = req.cookies.session;
    var session = null;
    if (session = this.validateToken(token, res)) {
        var str = "SELECT * FROM usr_auth WHERE uid = '"+session.uid+"';";
        this.db.query(str,
            function(err, rows, fields) {
                if (err) {
                    res.writeHead(500);
                }
                else if (rows.length == 0) {
                    res.writeHead(500);
                }
                else {
                    var template =
                    "<div class=\"user-pic\">"+
                    "<img id=\"prof-pic\" src=\"/user/file?file=prof.jpg\"/>"+
                    "</div><div class=\"primary-info\">"+
                    "<p>Username: {{username}}</p>"+
                    "<p>Email: {{email}}</p>"+
                    "</div>";
                    var view = {
                        username: rows[0].username,
                        email: rows[0].email
                    };
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    res.write(mustache.render(template, view));
                }
                res.send();
            });
    }
};

module.exports = profile;
