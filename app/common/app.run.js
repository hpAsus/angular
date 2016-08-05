var appRunFunc = function($rootScope, $state, $http, $httpParamSerializerJQLike) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        var stateIsProtected = toState.data && toState.data.secure;

        if (stateIsProtected) {

            // check user credentials
            $http({
                method: 'GET',
                url: '/api/checkuser',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (res) {

                // in case of user is not authenticated
                if (!res.success || !res.success.authenticated) {
                    event.preventDefault();
                    $state.go('login');
                }

            }).error(function (err) {

                // in case of any serverside error go to login page
                if (err) {
                    event.preventDefault();
                    $state.go('login');
                }

            });



        }
    });
};

angular.module('app').run(['$rootScope', '$state', '$http', '$httpParamSerializerJQLike', appRunFunc]);