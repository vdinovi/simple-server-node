var cookie = require('cookie');

/*var RingBuffer = function() {
    this.size = 10;
    this.top = 0;
    this.buf = new Array(10);
};

RingBuffer.prototype.push = function(val) {
    if (this.top == this.size)
        this.top = 0;
    this.buf[this.top++] = val;
}

RingBuffer.prototype.read = function() {
    var iter = this.top;
    var rtn = [];
    var count = this.size;
    while (count--) {
        if (iter == this.size) 
            iter = 0;
        if (this.buf[iter] == null)
            break;
        cconsole.log(this.buf[iter]);
        rtn.push(this.buf[iter++]);
    }
    return rtn;
}*/

var chat = function(server, sessionMap) {
    sessionMap = sessionMap; // should probably include auth instead
    //var ringBuf = new RingBuffer();
    var buf = [];
    var clients = [];

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
        clients[token] = {id: socket.id, sock: socket};
        io.sockets.connected[socket.id].emit('history', buf); //ringBuf.read());
        // Broadcast any messages received
        socket.on('message', function(msg) {
            var msgObj = {
                username: sessionMap[token].username,
                data: msg.data
            };
            //ringBuf.push(msgObj);
            buf.push(msgObj);
            io.emit('message', msgObj);
        });
    });

};

module.exports = chat;
