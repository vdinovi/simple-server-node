var session = function(sessionId, uid) {
    this.sessionId = sessionId;
    this.uid = uid;
    this.expired = false;
}

session.prototype.expire = function(session) {
    session.expired = true;
}

module.exports = session;
