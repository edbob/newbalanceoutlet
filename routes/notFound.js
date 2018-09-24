var express = require('express');

var breadcrumbs = require('./express-breadcrumb');
//var path = require('path');
var notFound = express();

notFound.use( breadcrumbs.Middleware(), function (req, res, next) {
    res.status(404 || 500).render('./pages/error',
        { 
            title: "Sorry, page not found: " + res.statusCode ,
            breadcrumbs: req.breadcrumbs 
        }
    );
});

module.exports = notFound;