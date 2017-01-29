var express = require('express');
var router = express.Router();
var request = require('request');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.use('signup', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req, username, password, done) {
        request({url: 'http://localhost:8080/user/create', method: 'POST', json: req.body}, function (err, httpResponse, body) {
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
        });
    }
));

/* GET home page. */
router.get('/', function(req, res) {
    res.render('create_account', { title: 'Login' });
});

router.post('/', passport.authenticate('signup', { successRedirect: '/home',
    failureRedirect: '/create-account',
    failureFlash: true })
);

module.exports = router;