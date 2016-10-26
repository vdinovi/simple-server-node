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
};

function init() {
    $.ajax({
        type: "GET",
        url: 'http://http://simple-server.wmphqv5kpb.us-west-1.elasticbeanstalk.com/user/validate',
        success: function() {
            var sock = new WebSocket("ws://localhost:3031");

            // Handle message
            sock.onmessage = function(msg) {
                var cur = $("#chat-window-box");
                var message = JSON.parse(msg.data);
                cur.val(cur.val() + message.user + ': ' + message.data + '\n');
                cur.scrollTop = cur.scrollHeight;
            }

            // Send message
            $("#input-form").submit(function(e) {
                e.preventDefault();
                var box = $("#input-text");
                sock.send(box.val());
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
