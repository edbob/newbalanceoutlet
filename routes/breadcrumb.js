var express = require('express');
var breadcrumb = express.Router();

var breadcrumbs = require('./express-breadcrumb');

breadcrumb.get('/breadcrumb', breadcrumbs.Middleware(), function (req, res) {
    res.render('layout', { breadcrumbs: req.breadcrumbs});
});

module.exports = breadcrumb;