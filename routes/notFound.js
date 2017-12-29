var express = require('express');
var path = require('path');
var notFound = express();

notFound.use(function (req, res, next) {
    res.status(404 || 500).render('./pages/error',
        { title: "Sorry, page not found: " + res.statusCode }
    );
});

module.exports = notFound;