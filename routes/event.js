var express = require('express');
var router = express.Router();
var request = require('request');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var upload = multer({dest: 'tmp/uploads',
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});

router.get('/id/:eventId', function(req, res) {
    request.get('http://localhost:8080/event/' + req.params.eventId, function (error, response, body) {
        var event = JSON.parse(body);
        res.render('event/manage', {eventTitle: event.title, eventDescription: event.description});
    });
});

router.get('/create', function(req, res) {
    res.render('event/create');
});

router.get('/add', function(req, res) {
    res.render('event/add');
});

router.post('/create', function(req, res) {
    request({url: 'http://localhost:8080/event/create', method: 'POST', json: req.body}, function(err, httpResponse, body) {
        //maybe handle errors here eventually
    });
    //(fs.createReadStream(req.file.path)).pipe(request.post('http://localhost:8080/practice-event/image'));
    res.redirect('/event/id/1');
})

module.exports = router;