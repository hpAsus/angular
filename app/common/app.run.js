// MAIN APP RUN
// =====================================================================================================================

(function () {
    var appRunFunc = function ($rootScope, $state, localStorageService, authService, userDataService, $translate) {
	    $translate.use(userDataService.getUserLanguage());

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	        var stateIsProtected = toState.data && toState.data.secure;

	        var userIsLoggedIn = userDataService.isAuthorized();

	        var stateAccessRoles = toState.data && toState.data.roles;
	        var userRole = userDataService.getUserRole() || 'guest';
	        var userHasRole = authService.checkUserAccess(userRole, stateAccessRoles);

	        console.log('stateIsProtected', stateIsProtected);
	        console.log('userRole', userRole);
	        console.log('userIsLoggedIn', userIsLoggedIn);
            console.log('userHasRole', userHasRole);
            console.log('\n\n');

            // todo: Check not only if user is logged ib, but check user has correct rights
            if (stateIsProtected && !userIsLoggedIn && !userHasRole) {
	            console.log('HO-HO-HO');
                // event.preventDefault();
                // $state.go('login');
            }
        });
    };

    angular.module('app').run(['$rootScope', '$state', 'localStorageService', 'authService', 'userDataService', '$translate', appRunFunc]);
})();