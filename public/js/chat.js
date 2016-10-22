function connect() {
    var sock = io('http://localhost:3030');
    sock.on('data', function(data) {
        console.log('data');
    });
};
