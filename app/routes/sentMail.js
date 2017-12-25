var express = require('express');
var nodemailer = require('nodemailer');
var colors = require('colors');

var sentmail = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'does.not.smoke.here@gmail.com',
      clientId: '339170722492-v3g2nuuounfkklsrppad41rmanevie86.apps.googleusercontent.com',
      clientSecret: '44Abz_4zyAJmRegGZbDf_vaF',
      refreshToken: '1/-esAs_k9pq3laqtgrLsBSZ3ub9sc7CX3SGLpmyEuQ7A'
    }
  });
  
  var url = require('url');
  
  var dateNow = new Date().toString().slice(8, 24);
  
  sentmail.post('/contact', function (req, res) {
    var host = req.hostname;
    var host2 = req.headers.host;
    var mailOptions = {
      from:'Отправитель: ' + host2 + '<' + req.body.email + '>',
      to: 'nedov@outlook.com',
      subject: req.body.name,
      text: req.body.message,
      html: '<p>Email отправителя: '+ req.body.email +'</p>'
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

  module.exports = sentmail;