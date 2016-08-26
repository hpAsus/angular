// General Router
// =====================================================================================================================
var express = require('express');
var router = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');
var pause = require('connect-pause');

var timeOut = 1 * 1000;

// Login
// =====================================================================================================================
router.route('/login')
    .post(pause(3000), function (req, res) {

        //Parsing body vars with bodyParser
        var email = req.body.email;
        var pass = req.body.password;

        // Authenticate user
        userManager.authenticate(email, md5(pass))
            .then(function (userObj) {

                //password is correct, we can authorize user
                req.session.authenticated = true;

                // remove unwanted data from user object
                delete userObj.password;
                delete userObj._id;

                // set user data in session
                req.session.user = userObj;

                res.setTimeout(timeOut, function () {
                    req.session.touch(req.session.id, req.session);
                    res.send({
                        success: true,
                        user: userObj
                    });
                });

            })
            .catch(function (err) {
                //not authorized
                req.session.touch(req.session.id, req.session);
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
router.route('/logout').get(pause(3000), function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.send({
                success: true
            });
        } else {
            res.send({
                success: false,
                error: {
                    code: 500,
                    message: 'Problems with session destroy'
                }
            });
        }
    });
});

// Forgot Password
// =====================================================================================================================
router.route('/forgot').get(pause(3000), function (req, res) {

    req.session.touch(req.session.id, req.session);
    res.send({
        success: true,
        message: 'Activation link has been sent to your email'
    });
});

// Action button test requests
// =====================================================================================================================
router.get('/action_req_1', function (req, res) {
    res.send({success: true, message: 'Success request with no delay'});
});
router.get('/action_req_2', pause(5000), function (req, res) {
    res.send({success: true, message: 'Success request with 5 sec delay'});
});
router.get('/action_req_3', pause(5000), function (req, res) {
    res.sendStatus(500);
});
router.get('/action_req_4', pause(5000), function (req, res) {
    res.send({success: false, message: 'No success request'});
});
router.get('/action_req_5', pause(70 * 1000), function (req, res) {
    res.send({success: 200, message: 'Success but to long'});
});

// Exports
// =====================================================================================================================
module.exports = router;
