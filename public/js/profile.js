const host = "http://localhost:8081/";

function renderProfile() {
    $.ajax({
        type: "GET",
        url: host + "profile",
        contentType: "text/html",
        data: {token: document.cookie},
        success: function(data, status, xhr) {
            $("#target").html(data); 
        },
        error: function(err, status, xhr) {
            if (err.status == 400)
                alert("Bad token. Re-authenticate to resolve");
            else
                $("#target").html("Failure to load");
        }
    });
}

function upload() {
    var data = new FormData();
    $.ajax({
        type: "POST",
        url: host + 'user/update',
        data: file,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            console.log(err);
        }
    });

};

