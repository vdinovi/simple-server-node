var cookie = require('cookie');

var chat = function(server, sessionMap) {
    sessionMap = sessionMap;
    var msgBuf = [];
    var clients = [];

    io = require('socket.io')(server);
    io.on('connection', function(socket) {
        var token = cookie.parse(socket.request.headers.cookie).session;
        var session = sessionMap[token];
        if (!session || session.expired) {
            socket.disconnect()
            return;
        }
        clients[token] = {
            id: socket.id,
            username: sessionMap[token].username,
        };
        var newClient = io.sockets.connected[socket.id];
        emitMessageHistory(newClient, msgBuf);
        emitClientList(clients);
        console.log(clients[token].username + " connected to chat");
        socket.on('message', function(msg) {
            var message = {
                username: clients[token].username,
                data: msg
            };
            msgBuf.push(message);
            io.emit('message', message);
        });

        socket.on('disconnect', function() {
            console.log(clients[token].username + " disconnected from chat");
            delete clients[token];
            emitClientList(clients);
        });
    });
};

function emitMessageHistory(client, msgBuf) {
    for (var i = 0; i < msgBuf.length; ++i) {
        client.emit('message', msgBuf[i]);
    }
};


function emitClientList(clients) {
    var connectedClients = "";
    for (var i = 0; i < clients.length; ++i) {
        connectedClients += clients[i].username+"\n";
    }   
    io.emit('clientList', connectedClients);
};

module.exports = chat;
