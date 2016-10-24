$(document).ready(function() {
    // Connect
    var socket = io('http://localhost:3030');
    socket.on('message', function(msg) {
        console.log(msg.data);
        var cur = $("#chat-window-box");
        cur.val(cur.val() + '\n' + msg.data);
    });
    
    $("#input-form").submit(function(e) {
        e.preventDefault();
        var box = $("#input-text");
        socket.send({data: box.val()});
        box.val('');
    });
});
