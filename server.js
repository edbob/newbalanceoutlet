var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
//var colors = require('colors');
var favicon = require('serve-favicon');
var path = require('path');
//var coolieParser = require('cookie-parser');
var breadcrumb = require('express-url-breadcrumb');

var app = express();
// use for every request  

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

app.use(breadcrumb());
 
// alternatively, add to a specific route
app.get('/', breadcrumb(), function(req, res){
    res.render('/home');
});

// use for every request  
app.use(breadcrumb(function(item, index){
    // convert each breadcrumb label to upper case
    item.label = item.label.toUpperCase(); 
}));

var breadcrumb = [];
  
  breadcrumb.push({ label: 'Home', url: '/' });
  breadcrumb.push({ label: 'about', url: '/about' });
  breadcrumb.push({ label: 'contact', url: '/contact' });
  breadcrumb.push({ label: 'notFound', url: '/notFound' });

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('app started '.green + host + port);
    };
});