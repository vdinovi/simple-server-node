var cookie = require('cookie');

var chat = function(server, sessionMap) {
    sessionMap = sessionMap; // should probably include auth instead
    //var msgBuf = require('./cpp/ringbuffer');
    var msgBuf = [];
    var clientList = [];

    io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
        var token = cookie.parse(socket.request.headers.cookie).session;
        var session = sessionMap[token];
        if (!session || session.expired) {
            socket.disconnect()
            return;
        }
        clients[token] = {id: socket.id, sock: socket};
        io.sockets.connected[socket.id].emit('history', buf);
        socket.on('message', function(msg) {
            var msgObj = {
                username: sessionMap[token].username,
                data: msg.data
            };
            buf.push(msgObj);
            io.emit('message', msgObj);
        });
    });
};

module.exports = chat;
