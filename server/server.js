const express = require('express');
const app = express();

require('./config/middleware.js')(app, express);

const port = process.env.PORT || 8000;

app.listen(port);
console.log("Listening on port: " + port);

