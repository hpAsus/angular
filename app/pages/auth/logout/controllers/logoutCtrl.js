// Logout controller
// =====================================================================================================================
(function () {

    var logoutUser = function ($http, $state, localStorageService, authService, toastService, loaderService) {

        loaderService.addLoader();
	    loaderService.showLoader();

        authService.userLogout().then(function (res) {
            if (res.data.success) {

                //successfully deleted session
                //delete local user info
                localStorageService.remove('loggedIn');
                localStorageService.remove('user');

                loaderService.hideLoader();

                $state.go('login');
            } else {
                toastService.show(res.data.error.message);
            }
        });

    };

    angular.module('app').controller('logoutCtrl', ['$http', '$state', 'localStorageService', 'authService', 'toastService', 'loaderService', logoutUser]);

})();