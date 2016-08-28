// Main Dashboard Controller
// =====================================================================================================================
(function () {

    var dashboardCtrlFunc = function (userSession, userDataService, authService, $rootScope, $window, $state, loaderService, $log) {
        var vm = this;

        // If not Authorized - go to Login State
        if (!userDataService.isAuthorized()) {
            $state.go('login');
        }

        // Clear loaders
        loaderService.addLoader();

        // User Rights Check
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var stateIsProtected = toState.data && toState.data.secure;
            var userIsLoggedIn = userDataService.isAuthorized();
            var stateAccessRoles = toState.data && toState.data.roles;
            var userRole = userDataService.getUserRole() || 'user';
            var userHasAccess = authService.checkUserAccess(userRole, stateAccessRoles);

            if ((stateIsProtected && !userIsLoggedIn) || ( stateIsProtected && !userHasAccess)) {
                userDataService.clearUserData();
                event.preventDefault();
                // $state.go('login'); // if using $state.go - strange error in Angular Material
                $window.location = '/';
            }
        });

	    if (userDataService.getUserData()) {
            // set locals
            vm.loggedIn = userDataService.isAuthorized();
            vm.user = userDataService.getUserData();
            vm.isAdmin = userDataService.isAdmin(userDataService.getUserRole());
        }

    };

    angular.module('app').controller('dashboardCtrl', ['userSession', 'userDataService', 'authService', '$rootScope', '$window', '$state', 'loaderService', '$log', dashboardCtrlFunc]);

})();