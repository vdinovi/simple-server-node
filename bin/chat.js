var chat = function(server, auth) {
    this.messageQueue = {};
    this.auth = auth;

    this.io = require('socket.io').listen(server);
    this.io.join 

    this.io.on('onconnection', function(sock) {
        
    });

};

module.exports = chat;
