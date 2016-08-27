// Email Service
// =====================================================================================================================
(function () {

    var emailServiceFunc = function ($q) {

        this.SEND = function (from, to, content) {
            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;

        };

    };

    angular.module('app.feedback').service('emailService', ['$q', emailServiceFunc]);

})();