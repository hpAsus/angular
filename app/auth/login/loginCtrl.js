(function () {

    var loginUser = function ($http, $httpParamSerializerJQLike, $state, $mdToast, userData, localStorageService) {
        this.user = {};

        if (userData) {
            $state.go('home');
        }

        this.submitLoginForm = function () {
            $http({
                method: 'POST',
                url: '/login',
                data: $httpParamSerializerJQLike(this.user),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (res) {
                if (res.success) {
                    // setting user data to $rootScope
                    localStorageService.set('loggedIn', true);
                    localStorageService.set('user', angular.toJson(res.user));

                    $state.go('viewProfile');

                } else {
                    // Show toast with error message
                    // todo translate message
                    // todo global settings for toast
                    $mdToast.show($mdToast.simple().position('top right').textContent(res.error.message));
                }
            }).error(function (err) {

                // Something wrong with serverside, show error toast
                // todo translate message
                // todo global settings for toast
                $mdToast.show($mdToast.simple().position('top right').textContent('Server is taking a coffee. Try again later'));

            });

        }

    };

    angular.module('app').controller('loginCtrl', ['$http', '$httpParamSerializerJQLike', '$state', '$mdToast', 'userData', 'localStorageService', loginUser]);

})();