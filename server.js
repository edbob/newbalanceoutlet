var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var colors = require('colors');
var favicon = require('serve-favicon');
var path = require('path');
var coolieParser = require('cookie-parser');

var app = express();
var port = process.env.PORT || 8089;
var host = process.env.host || "localhost:";

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));

var about = require('./app/routes/about');
app.use('/', about);

var homeStor = require('./app/routes/home');
app.use('/', homeStor);

var contact = require('./app/routes/contact');
app.use('/', contact);

app.use(express.static(__dirname + '/public'));

app.listen(port, function (err) {
    if(err){
        console.log(err);
    }else{
        console.log('app started '.green + host + port);
    };
});