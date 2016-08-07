// General Router
// =====================================================================================================================
var express = require('express');
var router = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');
var timeout = require('connect-timeout');
var bodyParser = require('body-parser');

// Login
// =====================================================================================================================
router.route('/login')
    .post(timeout('3s'), bodyParser.json(), haltOnTimedout, function (req, res) {

//app.post('/login', timeout('10s'), haltOnTimedout, function (req, res) {

        //Parsing body vars with bodyParser
        var email = req.body.email;
        var pass = req.body.password;

        // Check promised result
        userManager.authenticate(email, md5(pass))
            .then(function (userObj) {

                //password is correct, we can authorize user
                req.session.authenticated = true;

                // remove unwanted data from user object
                // todo refactor, because it's not a great idea
                delete userObj.password;
                delete userObj._id;

                // set user data in session
                req.session.user = userObj;

                res.send({
                    success: true,
                    user: userObj
                });
            })
            .catch(function (err) {
                //not authorized
                res.send({
                    success: false,
                    error: {
                        code: 401,
                        message: err.toString()
                    }
                });
            });

    });

// Logout
// =====================================================================================================================
router.route('/logout').get(function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.send({
                success: true
            });
        }
    });
});

// Connect Timeout Helper
// =====================================================================================================================
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}


// Exports
// =====================================================================================================================
module.exports = router;

