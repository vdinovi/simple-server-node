const host = "http://http://simpleserver.bfmpgunfdg.us-west-1.elasticbeanstalk.com/";

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
    var formData = new FormData($('#upload-form')[0]);
    formData.append('img', $('input[type=file]')[0].files[0], 'prof.jpg');

    $.ajax({
        type: "POST",
        url: host + 'user/upload',
        data: formData,
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
