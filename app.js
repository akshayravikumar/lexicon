var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var routes = require('./server/routes/routes');
var fs = require('fs');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var session = require('express-session');
var dbConfig = require('./server/config/database.js');

// set root directory
process.env.PWD = process.cwd();

// log requests to console
app.use(morgan('dev'));

// set public folder
app.use(express.static(process.env.PWD + '/public'));

// set view engine as simple html reader
app.set('view engine', 'html');
app.engine('html', function(path, options, cb) {
    fs.readFile(path, 'utf-8', cb);
});

// POST request body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
// add routes
app.use('/', routes);

// general error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

app.use(function(req, res) {
    res.sendfile(__dirname + '/public/views/index.html');
});


// set port, listen and log 
app.listen(port, function() {
    console.log("browsing at localhost:" + port);
});

module.exports = app;