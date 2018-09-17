var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
//var colors = require('colors');
var favicon = require('serve-favicon');
var path = require('path');
//var coolieParser = require('cookie-parser');

var app = express();
var port = process.env.PORT || 8089;
var host = process.env.host || "localhost:";

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));

var homeStor = require('./routes/home');
app.use('/', homeStor);

var about = require('./routes/about');
app.use('/', about);

var contact = require('./routes/contact');
app.use('/', contact);

var notFound = require('./routes/notFound');
app.use('/', notFound);

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('app started '.green + host + port);
    };
});