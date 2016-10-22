var chat = function(server, sessionMap) {
    this.messageQueue = {};
    this.sessionMap = sessionMap; // should probably include auth instead

    this.io = require('socket.io').listen(server);

    this.io.on('connection', function(client) {
        client.username = 'Guest';
        client.on('msg', function(msg) {
            var token = msg.session;
            var session = null;
            if (session = sessionMap[token]) {
                if (session.expired) {
                    // Tell user to re-authenticate
                    client.username = session.uid;
                }
                else {
                    // User has expired token
                    client.username = 'Expired Guest';
                }
            }
            else {
                // User has no token 
                client.username = 'Guest';
            }
        });
        console.log(client.username+' connected');
    });

};

module.exports = chat;
