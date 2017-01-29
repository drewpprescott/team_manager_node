var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.use('login', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req, username, password, done) {
        var json = {'email':username,'password':password};
        request({url: 'http://localhost:8080/user/authenticate', method: 'POST', json: json}, function (err, httpResponse, body) {
            if (err) {
                return done(err);
            }
            if (typeof body === 'undefined') {
                return done(null, false, req.flash('message','User Already Exists'));
            }
            return done(null, body);
        });
    }
));

/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Login' });
});

router.post('/', passport.authenticate('login', { successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true })
);

module.exports = router;