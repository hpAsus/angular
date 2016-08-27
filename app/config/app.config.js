// MAIN APP CONFIG
// =====================================================================================================================
(function () {

    var appConfig = function ($mdThemingProvider, localStorageServiceProvider, $httpProvider, userDataService) {

        // LocalStorage config
        // =============================================================================================================
        console.log('FIRED');

        // LocalStorage config
        // =============================================================================================================
        localStorageServiceProvider
            .setPrefix('at');

        // Material config
        // =============================================================================================================
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('orange')
            .warnPalette('red');


        // HTTP Interceptor for 401 Status code
        // =============================================================================================================
        $httpProvider.interceptors.push(['$q', '$window', function($q, $window) {
            return {
                'responseError': function(rejection) {
                    if(rejection.status === 401 ) {
                        console.log(rejection);
                        $window.location = '/';
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

    };

    angular.module('app').config(['$mdThemingProvider', 'localStorageServiceProvider', '$httpProvider', 'userDataService', appConfig]);

})();