// General Router
// =====================================================================================================================
var express = require('express');
var router = express.Router();
var User = require('./user.js');
var user = new User();
var md5 = require('md5');

// Login
// =====================================================================================================================
router.route('/login')
    .post(function (req, res) {

        //Parsing body vars with bodyParser
        var email = req.body.email;
        var pass = req.body.password;

        // Check promised result
        user.authenticate(email, md5(pass))
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

// Exports
// =====================================================================================================================
module.exports = router;
