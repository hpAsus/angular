// Logout controller
// =====================================================================================================================
(function () {

    var logoutUser = function ($http, $state, localStorageService) {

        $http({
            method: 'GET',
            url: '/logout',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res) {

            //successfully deleted session
            //delete local user info
            localStorageService.remove('loggedIn');
            localStorageService.remove('user');

            $state.go('home');

        }).error(function (err) {
            //something go wrong on serverside
        });

    };

    angular.module('app').controller('logoutCtrl', ['$http', '$state', 'localStorageService', logoutUser]);

})();