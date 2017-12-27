var express = require('express');
var nodemailer = require('nodemailer');
var colors = require('colors');
var hostName = process.env.host || "localhost:";

var contact = express.Router();

contact.get('/contact', function (req, res) {
  res.render('pages/contact');
});

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