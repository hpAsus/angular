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

// Check User
// =====================================================================================================================
User.prototype.authenticate = function (email, password) {
    return new Promise(function (resolve, reject) {
        db.findOne({
            email: email
        }, function (err, found) {

            if (found) {
                if (found.password === password) {
                    resolve(found);
                } else {
                    reject(new Error('Invalid password'));
                }
            } else {
                reject(new Error('User not found'));
            }
        });

    });
};

// Destroy User Session
// =====================================================================================================================
User.prototype.destroySession = function() {
    return new Promise(function (resolve, reject) {

    });
};
// List All User
// =====================================================================================================================
//User.prototype.listAll = function () {
//    db.find({name: {$exists: true}}, function (err, found) {
//        if (!err) {
//            return found;
//        } else {
//            console.log(err);
//        }
//    });
//};
// Exports
// =====================================================================================================================
module.exports = User;