$(document).ready(function() {
    // Connect
    var socket = io('http://localhost:3030');

    // Handle message
    socket.on('message', function(msg) {
        console.log(msg.data);
        var cur = $("#chat-window-box");
        cur.val(cur.val() + '\nUser: ' + msg.data);
    });

    // Send message
    $("#input-form").submit(function(e) {
        e.preventDefault();
        var box = $("#input-text");
        socket.send({data: box.val()});
        box.val('');
    });
});
