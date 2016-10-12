function updateTable() {
    var table = "<tr><th><u>Online Users</u></th></tr>";
    $.ajax({
        type:"GET",
        url:'cgi-bin/update.php',
        dataType:'json',
        success: function(obj) {
            for (var key in obj) {
                table += "<tr font-weight:><th>"+obj[key]+"</th><th>";
            }
            $("#userTable").html(table); 
        }
    });
}

$(document).ready(function() {
    // login 
    $("#loginForm").submit(function(e) { 
        $.ajax({
            type: 'post',
            url: 'cgi-bin/login.php',
            data: $("#loginForm").serialize(),
            success: function(data) {
                $UID = data['UID'];
                alert(data['msg']);
                updateTable();
            },
            error: function(data) {
                alert(data.responseJSON['msg']);
            }
        });
        e.preventDefault();
    });
});

$(document).ready(function() {
    // signup
    $("#signupForm").submit(function(e) { 
        $.ajax({
            type: 'post',
            url: 'cgi-bin/signup.php',
            data: $("#signupForm").serialize(),
            success: function(data) {
                alert(data['msg']);
                updateTable();
            },
            error: function(data) {
                alert(data.responseJSON['msg']);
            }
        });
        e.preventDefault();
    });
});

