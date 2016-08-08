// Main Dashboard Controller
// =====================================================================================================================
(function () {

    var dashboardCtrlFunc = function ($scope, userData, localStorageService) {



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

    angular.module('app').controller('dashboardCtrl', ['$scope', 'userData', 'localStorageService', dashboardCtrlFunc]);

})();