'use strict';

// Login controller
// =====================================================================================================================


(function () {

    var loginUser = function loginUser($rootScope, $http, $state, localStorageService, authService, loaderService, toastService) {

        var vm = this;

        // Add loader
        loaderService.addLoader();

        // Defaul user data is empty
        vm.user = {};

        // Check if login is set from reset password page
        if ($rootScope.login) {
            vm.user.email = $rootScope.login;
        }

        vm.submitLoginForm = function () {
            loaderService.showLoader();

            vm.loading = true;
            authService.userLogin(vm.user).then(function (res) {

                if (res.data.success) {

                    // setting user to localStorage
                    localStorageService.set('loggedIn', true);
                    localStorageService.set('user', angular.toJson(res.data.user));

                    $state.go('viewProfile');
                    loaderService.hideLoader();
                } else {
                    loaderService.hideLoader();
                    // Show toast with error message
                    toastService.show(res.data.error.message);
                }
            }).catch(function (err) {

                loaderService.hideLoader();
                // Something wrong with serverside, show error toast
                toastService.show(err.toString());
            });
        };
    };

    angular.module('app.auth').controller('loginCtrl', ['$rootScope', '$http', '$state', 'localStorageService', 'authService', 'loaderService', 'toastService', loginUser]);
})();