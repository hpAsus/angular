// API Router
// =====================================================================================================================
var express = require('express');
var apiRouter = express.Router();
var UserManager = require('./userManager.js');
var userManager = new UserManager();
var md5 = require('md5');

var treeData = require('../data/tree.json');
var timeOut = 0.5 * 1000;

// API / USER DATA
// =====================================================================================================================
apiRouter.route('/checksession')
    .get(function (req, res) {
        if (req.session.authenticated) {

            userManager.getUser(req.session.user.email)
                .then(function (data) {
                    delete data.password;
                    delete data._id;

                    res.setTimeout(timeOut, function () {
                        req.session.touch(req.session.id, req.session);
                        res.send({
                            success: true,
                            user: data
                        });
                    });

                })
                .catch(function (err) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });
                });
        } else {
            res.sendStatus(401);
        }
    });

// API / USER (SINGLES)
// =====================================================================================================================
apiRouter.route('/users/:user_id')

// USER - Get single user
// =====================================================================================================================
    .get(function (req, res) {

        if (req.session.authenticated) {
            userManager.getUser(req.session.user.email)
                .then(function (data) {
                    delete data.password;
                    delete data._id;
                    req.session.touch(req.session.id, req.session);
                    res.setTimeout(timeOut, function () {
                        res.send({
                            success: true,
                            user: data
                        });
                    });
                })
                .catch(function (err) {
                    req.session.touch(req.session.id, req.session);
                    res.send({
                        success: false,
                        error: {
                            code: 500, //todo: change code
                            message: 'Something go wrong while getting data on serverside'
                        }
                    });

                });

        } else {
            res.sendStatus(401);
        }


    })

    // USER - Update single user
    // =================================================================================================================
    .put(function (req, res) {

        if (req.session.authenticated) {
            userManager.updateUser(req.body)
                .then(function (data) {
                    req.session.touch(req.session.id, req.session);
                    res.setTimeout(timeOut, function () {
                        res.send({
                            success: true,
                            user: data
                        });
                    });
                }).catch(function (err) {
                req.session.touch(req.session.id, req.session);
                res.send({
                    success: false,
                    error: {
                        code: 500, //todo: change code
                        message: 'Something go wrong while getting data on serverside'
                    }
                });
            });

        } else {
            res.sendStatus(401);
        }
    })

    // USER - Create single user
    // =================================================================================================================
    .post(function (req, res) {

        console.log('Saving new user!');
        res.json({
            STATUS: 'Not implemented yet'
        });
    })

    // USER - Delete single user
    // =================================================================================================================
    .delete(function (req, res) {
        if (req.session.authenticated) {
            res.json({
                STATUS: 'Not implemented yet'
            });
        } else {
            res.sendStatus(401);
        }
    });

// USERS
// =====================================================================================================================
apiRouter.route('/userslist')
    .get(function (req, res) {
        if (req.session.authenticated) {
	        userManager.getAllUsers().then(function (users) {
	            res.send({
		            success: true,
		            users: users
	            });
            }).catch(function (err) {
		        res.send({
			        success: false,
			        error: {
				        code: 500, //todo: change code
				        message: err
			        }
		        });

	        });

        } else {
            res.sendStatus(401);
        }
    });

// Get Tree
// =====================================================================================================================
apiRouter.route('/getTree')
    .get(function (req, res) {
        if (req.session.authenticated) {
            res.send({
                success: true,
                tree: treeData.tree
            });
        } else {
            res.sendStatus(401);
        }
    });


// Exports
// =====================================================================================================================
module.exports = apiRouter;