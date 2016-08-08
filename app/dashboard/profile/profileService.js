// Profile Service
// =====================================================================================================================
(function () {

    var profileServiceFunc = function ($http) {


        this.getUserProfile = function (userLogin) {

            return $http({
                method: 'GET',
                url: '/api/users/' + userLogin
            })

        };

        // user login
        this.userLogin = function (userData) {
            return $http({
                method: 'POST',
                url: '/login',
                data: userData
            });
        };

        // reset password
        this.resetPassword = function (login) {
            return $http({
                url: '/forgot',
                method: 'GET',
                data: login
            });
        }

        // user logout

        this.userLogout = function() {
            return $http({
                method: 'GET',
                url: '/logout'
            });
        }
    };

    angular.module('app.profile').service('profileService', ['$http', profileServiceFunc]);

})();