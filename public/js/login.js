function loginEvent() {
    $("#login-form").submit(function(e) { 
        var info = {
            "username": $("#login-form :input[name='username']").val(),
            "password": $("#login-form :input[name='password']").val()
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:3030/user/login",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(info),
            withCredentials: true,
            success: function(data, status, xhr) {
                document.cookie = xhr.getResponseHeader('Token');
            },
            error: function(err) {
                console.log(err);
            }
        });
        e.preventDefault();
    });
};

function signupEvent() {
    $("#signup-form").submit(function(e) { 
        var info = {            
            "email": $("#signup-form :input[name='email']").val(),
            "username": $("#signup-form :input[name='username']").val(),
            "password": $("#signup-form :input[name='password']").val(),
            "confirmPass": $("#signup-form :input[name='confirmPass']").val()
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:3030/user/signup",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(info),
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

