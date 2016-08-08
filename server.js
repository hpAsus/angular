// BASE SETUP
// =====================================================================================================================
var rootDir = __dirname;
var port = process.env.PORT || 9000;

var md5 = require('md5');
var timeout = require('connect-timeout');
var express = require('express');
var router = require('./server/router.js');
var apiRouter = require('./server/router_api.js');
var errorhandler = require('errorhandler');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// USER MODEL
// =====================================================================================================================
var UserManager = require('./server/userManager.js');
var userManager = new UserManager({
    email: 'olga@mail.ru',
    password: md5('123'),
    name: 'Olga',
    birthdate: '08-04-1984',
    age: 32,
    bio: 'Nice beaver!'
});
//userManager.createUser();

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
        maxAge: 10 * 60 * 1000
    }

}));

app.use(
    "/", // URL for access to static content
    express.static(rootDir) //position of static content in a filesystem
);
// timeout for all requests
//app.use(function(req,res,next){
//    setTimeout(next,1200)
//});


// Router Settings
// =====================================================================================================================
app.use('/', router);

// All of the API routes will be prefixed with '/api'
app.use('/api', apiRouter);

// check all API routes for all requests - user should be authenticated
app.all('/api/*', function (req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.sendStatus(401);
    }
});


// START THE SERVER
// =====================================================================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
