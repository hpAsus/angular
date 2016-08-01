// ROUTES FOR OUR API
// =====================================================================================================================
var express = require('express');
var router = express.Router();

// API / USERS
// ==================================
router.route('/users')

    //Create user
    .post(function (req, res) {

        console.log('Saving new user!');
        res.json({
            STATUS: 'Creating new user!'
        });
    })

    // Get list of users
    .get(passport.authenticate('local'), function (req, res) {


        console.log('searching for the users');
        res.json({
            STATUS: 'Getting list of users!'
        });
    });

// API / USER (SINGLES)
// ==================================
router.route('/users/:user_id')

    // Getting a single user
    .get(function (req, res) {
        res.json({
            STATUS: 'Getting single user info',
            user_id: req.params.user_id
        });
    })

    //updating user info
    .put(function (req, res) {
        res.json({
            STATUS: 'Updating a single user info',
            user_id: req.params.user_id
        })
    })
    //deleting user info
    .delete(function (req, res) {
        res.json({
            STATUS: 'Deleting a single user',
            user_id: req.params.user_id
        })
    });

// Exports
// =====================================================================================================================
module.exports = router;