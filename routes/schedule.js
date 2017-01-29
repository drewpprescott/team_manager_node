var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('schedule', { userFirstName: req.user.firstName, userLastName: req.user.lastName });
});

module.exports = router;