const host = "http://localhost:8081/";
const wshost = "ws://localhost:8081/";


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
        url: host + "user/validate",
        success: function() {
            var sock = io(wshost);

            // Handle message
            sock.on('message', function(message) {
                var cur = $("#chat-window-box");
                cur.val(cur.val() + message.username + ': ' + message.data + '\n');
                // TODO: Why isn't this working??
                cur.scrollTop = cur.scrollHeight;
            });

            // Handle clientList
            sock.on('clientList', function(clients) {
                $("#online-users-box").val(clients);
            });

            // Send message
            $("#input-form").submit(function(e) {
                e.preventDefault();
                var box = $("#input-text");
                if (box.val() != "" && box.val().length < 50)
                    sock.send(box.val());
                box.val('');
            });
        },
        error: function(err) {
            console.log(err)
            alert("Log in in order to use this service");
        }
    });

};

$(document).ready(function() {
    init();
});

