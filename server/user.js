var schemas = require("./schemas.js"); // Database scheme
var db = require("./db.js"); //Database class
var _ = require("lodash");

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
User.prototype.checkUser = function (email, password) {
    var passInDb = null;
    var equalPasswords = false;

    // search for user with email
    db.find({
        email: email
    }, function (err, found) {
        if (found.length === 1) {

            //if found compare passwords
            passInDb = found[0].password;
            console.log('passInDb === password ', passInDb === password);

            if (passInDb === password) {
                equalPasswords = true;
            }
        } else {
            console.log('[Error]');
        }
    });

    return equalPasswords;
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