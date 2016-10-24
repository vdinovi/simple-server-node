var session = function(sessionId, uid, username) {
    this.expired = false;
    this.sessionId = sessionId;
    this.uid = uid;
    this.username = username;
}

session.prototype.expire = function(session) {
    session.expired = true;
}

module.exports = session;
