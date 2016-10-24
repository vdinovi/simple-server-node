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
        url: "http://simpleserver.wmphqv5kpb.us-west-1.elasticbeanstalk.com/chat",
        success: function() {
            // Connect
            var socket = io('http://localhost:3030');

            // Handle message
            socket.on('message', function(msg) {
                console.log(msg.data);
                var cur = $("#chat-window-box");
                cur.val(cur.val() + '\n' + msg.username + ': ' + msg.data);
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
        error: function() {
            alert("Log in in order to use this service");
        }
    });

}

$(document).ready(function() {
    init();
});
