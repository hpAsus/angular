// BASE SETUP
// =====================================================================================================================
var rootDir = __dirname;
var port = process.env.PORT || 9000;

var path = require('path');
var fs = require('fs');
var md5 = require('md5');
var express = require('express');
var app = express();
var router = express.Router();
var errorhandler = require('errorhandler');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');


// USER MODEL
// =====================================================================================================================
var User = require('./server/user.js');
var user = new User({
    email: 'olga@mail.ru',
    password: md5('123'),
    name: 'Olga',
    birthdate: '08-04-1984',
    age: 32,
    bio: 'Nice beaver!'
});
//user.create();

// CONFIGS
// =====================================================================================================================

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Error handling
app.use(errorhandler({dumpExceptions: true, showStack: true}));

// Method Override
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(session({
    secret: 'angular secret key',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1*60*1000
    }
}));



app.use(
    "/", // URL for access to static content
    express.static(rootDir) //position of static content in a filesystem
);


// API / login
// =====================================================================================================================


router.route('/login')
    .post(function (req, res) {

        //Parsing body vars with bodyParser
        var email = req.body.email;
        var pass = req.body.password;

        // Check username
        var isUserValid = user.checkUser(email, md5(pass));

        // Check promised result
        isUserValid.then(function (userObj) {

            //password is correct, we can authorize user
            req.session.authenticated = true;
            req.session.login = userObj.email;
            req.session.username = userObj.name;

            res.send({
                success: true
            });
        });

        // Catch errors
        isUserValid.catch(function(err) {
            //not authorized
            res.send({
                success: false,
                error: {
                    code: 401,
                    message: err.toString()
                }
            });
            res.sendStatus(403);
        });

    });

router.route('/checkuser')
    .get(function (req, res) {

        if (req.session.authenticated) {
            res.json({
                success: true,
                authenticated: req.session.authenticated
            });
        }
        console.log();


    });
//router.route('/logout').get(function (req, res) {
//    delete req.session.authenticated;
//    res.redirect('/');
//});


app.use('/api', router); //all of the routes will be prefixed with /api

// START THE SERVER
// =====================================================================================================================
app.listen(port);

console.log('Magic happens on port ' + port);