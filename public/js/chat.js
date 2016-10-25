// AJAX does not allow parsing of cookies (Why?)
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function init() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3030/user/validate',
        success: function() {
            // Connect
            var socket = io('http://localhost:3030');

            socket.on('history', function(msgs) {
                var buf = "";
                var length = msgs.length;
                for (var i = 0; i < length; ++i) {
                    buf += '\n' + msgs[i].username + ': ' + msgs[i].data;
                } 
                var cur = $("#chat-window-box");
                cur.val(cur.val() + buf);
                cur.scrollTop = cur.scrollHeight;
            });

            // Handle message
            socket.on('message', function(msg) {
                var cur = $("#chat-window-box");
                cur.val(cur.val() + '\n' + msg.username + ': ' + msg.data);
                cur.scrollTop = cur.scrollHeight;
            });

            // Send message
            $("#input-form").submit(function(e) {
                e.preventDefault();
                var box = $("#input-text");
                socket.send({data: box.val()});
                box.val('');
            });

            return true;
        },
        error: function(err) {
            console.log(err)
            alert("Log in in order to use this service");
        }
    });

}

$(document).ready(function() {
    init();
});
