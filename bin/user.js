
var user = function(auth, sessionMap) {
    this.sessionMap = sessionMap;
    this.auth = auth; 
};

/*user.prototype.uploadFile(req, res, file) {
 
}*/

module.exports = user;
