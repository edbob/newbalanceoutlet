var express = require('express');
var nodemailer = require('nodemailer');
var configur = require("../db/db.json")
//var colors = require('colors');
//var hostName = process.env.host || "localhost:";

var contact = express.Router();

contact.get('/contact', function (req, res) {
  res.render('pages/contact');
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'doess.not.smoke.here@gmail.com',
      clientId: this.clientId = configur.clientId,
      clientSecret: this.clientId = configur.clientSecret,
      refreshToken: this.refreshToken = configur.refreshToken
    }
  });
  
  //var url = require('url');
  var dateNow = new Date().toString().slice(8, 24);

  contact.post('/contact', function (req, res) {

    var senderConf = {
      Sendname: req.body.name,
      Sendemail: req.body.email
    }

    var mailOptions = {
      from: senderConf.Sendname + '<'+senderConf.Sendemail+'>',
      to: 'nedov@outlook.com',
      subject: req.body.name,
      html: req.body.message + ' <br /> <p><b>Email отправителя: '+ req.body.email + '<br />отправлено с сайта: ' + req.headers.host + ' </b></p>'
    };
  
    transporter.sendMail(mailOptions, function (err, res) {
      if (err) {
        console.log('Error: '.red + err.message + ' [' + dateNow + ']');
      } else {
        console.log('Email Sent from: ' + req.body.email + "'".green + ' [' + dateNow + ']');
      }
    });
  
    res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
  });

  module.exports = contact;