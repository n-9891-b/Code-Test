var express = require('express');
var app = express();

require('./config/middleware.js')(app, express);

var port = process.env.PORT || 8000;

app.listen(port);
console.log("Listening on port: " + port);

