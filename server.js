var connect = require('connect');
var http = require('http');

//  Primary component - contains all middleware
//  - app.use(middleware): middleware added as a stack and is executed until no 'next' is called
var app = connect();


app.use('/', (req, res, next) => {
    console.log('hi');
    //next();
});

app.use(() => {
    console.log('there');
});



// Could alternatively use 'http.createServer(app)'
var server = app.listen(3030);

