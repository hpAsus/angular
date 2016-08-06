(function () {

    var appRunFunc = function ($rootScope, $state, $http, $httpParamSerializerJQLike) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var stateIsProtected = toState.data && toState.data.secure;

            console.log($rootScope.loggedIn);

            // todo: THis check should be more complicated)

            if (stateIsProtected && !$rootScope.loggedIn) {
                event.preventDefault();
                $state.go('login');
            }
        });
    };

    angular.module('app').run(['$rootScope', '$state', '$http', '$httpParamSerializerJQLike', appRunFunc]);
})();