var express = require('express');
var about = express.Router();
var breadcrumbs = require('./express-breadcrumb');

about.get('/about', breadcrumbs.Middleware(), function (req, res) {

  var users = [
    { name: 'Holly', email: 'holly@scotch.io', avatar: 'http://placekitten.com/700/700' },
    { name: 'Chris', email: 'chris@scotch.io', avatar: 'http://placekitten.com/700/700' },
    { name: 'Ado', email: 'Ado@scotch.io', avatar: 'http://placekitten.com/700/700' },
    { name: 'Samantha', email: 'Samantha@scotch.io', avatar: 'http://placekitten.com/700/700' }
  ];

  res.render('pages/about', 
    { 
      users: users, 
      title: 'The Team',
      breadcrumbs: req.breadcrumbs 
    });
});

module.exports = about;