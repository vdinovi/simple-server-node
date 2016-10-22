$(document).ready(function () {
    $("#input-form").submit(function(e) {
        e.preventDefault();    
        var data = {message: $("#input-form :input[name='data']").val()};
        $.ajax({
            type: "POST",
            url: "http://localhost:3030/chat",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            success: function(data, status, xhr) {
                $("#chat-window-box").val(data);
            },
            error: function(err, status, xhr) {
                console.log(err);
            }
        });

    });
});
