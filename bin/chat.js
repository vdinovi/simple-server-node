var cookie = require('cookie');

var chat = function(server, sessionMap) {
    this.sessionMap = sessionMap; // should probably include auth instead
    this.clientMap = {};

    io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
        // Authenticate
        var token = cookie.parse(socket.request.headers.cookie).session;
        var session = sessionMap[token];
        // Missing or expired token
        if (!session || session.expired) {
            socket.disconnect()
            return;
        }
        // Broadcast any messages received
        socket.on('message', function(msg) {
            io.emit('message', {
                username: sessionMap[token].username,
                data: msg.data
            });
        });
    });

};

module.exports = chat;
