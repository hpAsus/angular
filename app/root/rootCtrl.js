(function () {

    var rootCtrl = function ($scope, $rootScope, userData, localStorageService) {

        // if we have session on serverside - pass data to local variables
        if (userData) {

            // update on localstorage
            localStorageService.set('loggedIn', true);
            localStorageService.set('user', angular.toJson(userData));

            // set locals
            this.loggedIn = localStorageService.get('loggedIn');
            this.user = angular.fromJson(localStorageService.get('user'));

        }

    };

    angular.module('app').controller('rootCtrl', ['$scope', '$rootScope', 'userData', 'localStorageService', rootCtrl]);

})();