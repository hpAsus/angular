// DEPENDENCIES
// =====================================================================================================================
var schemas = require("./schemas.js"); // Database scheme
var db = require("./db.js"); //Database class
var _ = require("lodash");
var Promise = require('promise-polyfill');

// USER MODEL Structure
// =====================================================================================================================
var User = function (data) {
    this.data = this.sanitize(data);
};

User.prototype.data = {};


// Get value by name
// =====================================================================================================================
User.prototype.get = function (name) {
    return this.data[name];
};

// Set value by name
// =====================================================================================================================
User.prototype.set = function (name, value) {
    this.data[name] = value;
};

// Sanitize data
// =====================================================================================================================
User.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
};

// Create user
// =====================================================================================================================
User.prototype.create = function () {

    var self = this;

    // todo:validation

    // before inserting check if already exists
    db.find(self.data, function (err, found) {
        if (!found.length) {

            //inserting
            db.insert(self.data, function (err, newData) {
                if (err) {
                    console.log('[Error] ', err);
                } else {
                    console.log('[SUCCESS] Added new record: ', newData);
                }
            });
        } else {
            console.log('[ERROR] Already have such record!');
        }
    });
};

// Check user
// =====================================================================================================================
User.prototype.checkUserPromised = function (email, password) {

    return new Promise(function (resolve, reject) {

        db.findOne({
            email: email
        }, function (err, found) {

            console.log('found', found);
            if (found) {
                if (found.password === password) {
                    console.log('Equal passwords!');
                    resolve("Equal passwords!");
                } else {
                    reject(new Error("Invalid password"));
                }
            }
        });

    });
};

User.prototype.checkUser = function (email, password) {
    var passInDb = null;
    var self = this;
    var equalPasswords = null;
    var user = null;



    /*// search for user with email
     db.findOne({
     email: email
     }, function (err, found) {

     if (found) {
     user = found;
     //if found compare passwords
     //passInDb = found.password;
     //console.log('passInDb === password ', passInDb === password);
     //checkEquality(found, password);

     //if (passInDb === password) {
     //    console.log('self.equalPasswords: ');
     //    self.equalPasswords = true;
     //}
     } else {
     console.log('[Error]');
     }
     });*/


    /*function checkEquality(found, password) {
     if (found === password) {
     equalPasswords = true;
     }
     }*/
    //console.log('equalPasswords: ', equalPasswords);
    //return self.equalPasswords;
};

// List all user
// =====================================================================================================================
User.prototype.listAll = function () {
    db.find({name: {$exists: true}}, function (err, found) {
        if (!err) {
            return found;
        } else {
            console.log(err);
        }
    });
};
// Exports
// =====================================================================================================================
console.log(User);
module.exports = User;