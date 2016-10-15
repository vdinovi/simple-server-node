function loginEvent() {
    $("#login-form").submit(function(e) { 
        $.ajax({
            type: "POST",
            url: "http://localhost:3030/user/login",
            dataType: "application/json",
            data: JSON.stringify($("#loginForm").serializeArray()),
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log(data);
            }
        });
        e.preventDefault();
    });
};

function signupEvent() {
    $("#signup-form").submit(function(e) { 
        $.ajax({
            type: "POST",
            url: "http://localhost:3030/user",
            dataType: "application/json",
            data: JSON.stringify($("#loginForm").serializeArray()),
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log(data);
            }
        });
        e.preventDefault();
    });
};

$(document).ready(function() {
    $(".signup").hide();

    $("#signup-box-link").click(function() {
        $(".login").fadeOut(100);
        $(".signup").delay(100).fadeIn(100);
        $("#login-box-link").removeClass("active");
        $("#signup-box-link").addClass("active");
    });
    $("#login-box-link").click(function() {
        $(".signup").fadeOut(100);
        $(".login").delay(100).fadeIn(100);
        $("#signup-box-link").removeClass("active");
        $("#login-box-link").addClass("active");
    });
});

