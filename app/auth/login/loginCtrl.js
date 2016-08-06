(function () {

    var loginUser = function ($http, $httpParamSerializerJQLike, $state, $mdToast, $rootScope) {
        this.user = {};

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
                    $rootScope.user = res.user;
                    $rootScope.loggedIn = true;

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

    angular.module('app').controller('loginCtrl', ['$http', '$httpParamSerializerJQLike', '$state', '$mdToast', '$rootScope', loginUser]);

})();