(function () {

    var appRunFunc = function ($rootScope, $state, localStorageService) {



        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            var stateIsProtected = toState.data && toState.data.secure;

            // todo: THis check should be more complicated)
            if (stateIsProtected && !localStorageService.get('loggedIn')) {
                event.preventDefault();
                $state.go('login');
            }
        });
    };

    angular.module('app').run(['$rootScope', '$state', 'localStorageService', appRunFunc]);
})();