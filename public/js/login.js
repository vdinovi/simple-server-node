const host = "http://simpleserver.bfmpgunfdg.us-west-1.elasticbeanstalk.com/";

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

$(document).ready(function() {
    $("#login-form").submit(function(e) { 
        e.preventDefault();
        var info = {
            "username": $("#login-form :input[name='username']").val(),
            "password": $("#login-form :input[name='password']").val()
        };
        $.ajax({
            type: "POST",
            url: host + "user/login",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(info),
            success: function(data, status, xhr) {
                alert('Successfully logged in as ' + data.username);
                document.cookie = 'session='+getCookie("session");
            },
            error: function(err, status, xhr) {
                console.log(err);
            }
        });
    });

    $("#signup-form").submit(function(e) { 
        e.preventDefault();
        var info = {            
            "email": $("#signup-form :input[name='email']").val(),
            "username": $("#signup-form :input[name='username']").val(),
            "password": $("#signup-form :input[name='password']").val(),
            "confirmPass": $("#signup-form :input[name='confirmPass']").val()
        };
        $.ajax({
            type: "POST",
            url: host + "user/signup",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(info),
            success: function(data) {
                alert("Account created");
                console.log(data);
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

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

