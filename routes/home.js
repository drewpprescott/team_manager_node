var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.get('/', isAuthenticated, function(req, res){
    res.render('home', { userFirstName: req.user.firstName, userLastName: req.user.lastName });
});

module.exports = router;