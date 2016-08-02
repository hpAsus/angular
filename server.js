// BASE SETUP
// =====================================================================================================================
var rootDir = __dirname;
var port = process.env.PORT || 8000;

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

// Logging with morgan
// =====================================================================================================================
var morgan = require('morgan');
var accessLogStream = fs.createWriteStream(path.join(rootDir, 'access.log'), {flags: 'a'});


// PASSPORT
// =====================================================================================================================
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function (username, password, done) {

        // todo: insert NeDB check here. For now, just a simple hardcoded check.
        console.log('checking password');
        if (username === 'foo' && password === 'bar') {
            done(null, {user: username});
        }
        else {
            done(null, false, {message: 'Incorrect password.'});
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// USER MODEL
// =====================================================================================================================
var User = require('./server/user.js');

var user = new User({name: 'Peter'});
var olga = new User({
    email: 'olga@mail.ru',
    password: md5('123'),
    name: 'Olga',
    birthdate: '08-04-1984',
    age: 32,
    bio: 'Nice beaver!'
});
//console.log(user);
//console.log(user.get('name'));
//console.log(user.get('name'));
//olga.create();
//console.log(user.listAll());

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
    saveUninitialized: true,
    cookie: {secure: true}
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

// Morgan logging middleware
app.use(morgan('combined', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, // skip requests wit status code < 400
    stream: accessLogStream
}));


app.use(
    "/", // URL for access to static content
    express.static(rootDir) //position of static content in a filesystem
);

// ROUTES FOR API
// =====================================================================================================================

// API / USERS
// ==================================
router.route('/login')

    //User login
    .post(function (req, res) {
        var email = req.body.email;
        var pass = req.body.password;
        //console.log('POST data: ', req.body);

        console.log('checkUser: ', user.checkUser(email, md5(pass)));

        if (user.checkUser(email, md5(pass))) {
            //console.log('Cool! Time to autorize');
            res.status(200);
        } else {
            res.status(401);
        }
        //console.log(email);
        //console.log(pass);

        res.json({
            'username': email,
            'password': pass
        });
    });
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

        //passport.authenticate('local');

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

app.use('/api', router); //all of the routes will be prefixed with /api

// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Magic happens on port ' + port);