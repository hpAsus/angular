// Logout controller
// =====================================================================================================================
(function () {

    var logoutUser = function ($http, $state, $rootScope) {

        $http({
            method: 'GET',
            url: '/logout',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(res) {

            //successfully deleted session
            //delete local user info
            $rootScope.user = null;
            $rootScope.loggedIn = false;

            $state.go('home');

        }).error(function (err) {
            //something go wrong on serverside
        });

    };

    angular.module('app').controller('logoutCtrl', ['$http', '$state', '$rootScope', logoutUser]);

})();