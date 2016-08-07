// API Router
// =====================================================================================================================
var express = require('express');
var apiRouter = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');

// API / USER DATA
// =====================================================================================================================
apiRouter.route('/getuserdata')
    .get(function(req,res) {
        if(req.session.authenticated) {
            res.send({
                success: true,
                user: req.session.user
            });
        } else {
            res.send({
                success: false,
                error: {
                    code: 401,
                    message: 'You are not authorized!'
                }
            });
        }
    });

// API / USERS
// =====================================================================================================================
apiRouter.route('/users')
    // Get list of users
    .get(function (req, res) {
        res.json({
            STATUS: 'Not implemented yet'
        });
    });

// API / USER (SINGLES)
// =====================================================================================================================
apiRouter.route('/users/:user_id')

// USER - Get single user
// =====================================================================================================================
    .get(function (req, res) {

        if (req.session.authenticated) {
            userManager.getUser(req.session.user.email)
                .then(function(data) {
                    delete data.password;
                    delete data._id;
                    res.send({
                        success: true,
                        user: data
                    });
                })
                .catch(function(err) {
                    res.json({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });

                });

        } else {
            res.json({
                success: false,
                error: {
                    code: 401,
                    message: 'Not Authorized'
                }
            });
        }


    })

// USER - Update single user
// =====================================================================================================================
    .put(function (req, res) {

        if (req.session.authenticated) {
            console.log(req.body);
            userManager.updateUser(req.body)
                .then(function(data) {
                    console.log(data);
                    res.send({
                        success: true,
                        user: data
                    });
                }).catch(function(err) {
                    res.json({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });
                });
            //res.json({
            //    STATUS: 'Updating a single user',
            //    user_id: req.params.user_id,
            //    name: req.body.name
            //});
        } else {
            res.json({
                success: false,
                error: {
                    code: 401,
                    message: 'Not Authorized'
                }
            });
        }
    })

// USER - Create single user
// =====================================================================================================================
    .post(function (req, res) {

        console.log('Saving new user!');
        res.json({
            STATUS: 'Not implemented yet'
        });
    })

// USER - Delete single user
// =====================================================================================================================
    .delete(function (req, res) {
        res.json({
            STATUS: 'Not implemented yet'
        })
    });


// Exports
// =====================================================================================================================
module.exports = apiRouter;