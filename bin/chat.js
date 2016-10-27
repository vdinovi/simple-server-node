var cookie = require('cookie');
var ws = require('ws');
const wshost = "ws://simpleserver.bfmpgunfdg.us-west-1.elasticbeanstalk.com/chat";

var chat = function(sessionMap) {
    sessionMap = sessionMap; // should probably include auth instead
    //var msgBuf = require('./cpp/ringbuffer');
    var msgBuf = [];
    var clientList = [];
    var wss = new ws.Server({host: wshost});

    wss.on('connection', function(sock) {
        var token = cookie.parse(sock.upgradeReq.headers.cookie).session;
        var session = sessionMap[token];
        if (!session || session.expired) {
            sock.close(400, 'Invalid session token');
            return;
        }
        clientList[token] = {socket: sock, session: session};
        for (var i = 0; i < msgBuf.length; ++i) {
            sock.send(msgBuf[i]);
        }

        sock.on('message', function(msg) {
            var message = {
                user: clientList[token].session.username,
                data: msg
            };
            msgBuf.push(JSON.stringify(message));
            wss.clients.forEach(function(client) {
                client.send(JSON.stringify(message));
            });
        });

    });
};

module.exports = chat;
