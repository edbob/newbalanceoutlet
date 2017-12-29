var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    request = require('request'),
    cheerio = require('cheerio'),
    home = express.Router();

    home.use(bodyParser.json());
    home.use(bodyParser.urlencoded({ extended: false }));
    home.use(cookieParser());

    home.get('/', function (req, res) {
    var c = req.cookies.num;

    res.render('pages/home', 
    { title: 'Домашняя страница покупок', num: c != undefined ? c : 4 });
});
home.post('/ajax', function (req, res) {
    res.cookie('num', req.body.num);
    getContent({ 'url': req.body.url, 'count': req.body.num }, function (data) {
        res.json(data);
    });
});

function getContent(req, collback) {
    request.get(req.url, function (error, response, html) {
        var data = [];
        if (error || response.statusCode != 200) {
            collback({ 'status': 'error' });
        } else {
            var $ = cheerio.load(html);
            var dom = $('.clearFix .figureWrapper')
            dom.each(function (i, element) {
                if (i > req.count - 1) {
                    return;
                }

                var _title = $(this).find('figcaption h3'),
                    _price = $(this).find('figcaption .productPrice'),
                    _origPrice = $(this).find('figcaption .origPrice'),
                    _savePrice = $(this).find('figcaption .savePrice'),
                    _imgs = $(this).find('.impression > img'),
                    _url = $(this).find('a')

                data.push(
                    {
                        title: _title.text(),
                        price: _price.text(),
                        origPrice: _origPrice.text(),
                        savePrice: _savePrice.text(),
                        imgs: _imgs.attr('src'),
                        url: _url.attr('href')
                    });
            });
            collback({ 'status': 'success', 'data': data });
        };
    });
};

module.exports = home;