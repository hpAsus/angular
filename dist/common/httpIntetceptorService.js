'use strict';

// HTTP Interceptor
// =====================================================================================================================
(function () {

    var httpInterceptorFunc = function httpInterceptorFunc($q, $state) {
        return {
            // optional method
            'request': function request(config) {
                // do something on success
                return config;
            },

            // optional method
            'requestError': function requestError(rejection) {
                // do something on error
                if (canRecover(rejection)) {
                    return responseOrNewPromise;
                }
                return $q.reject(rejection);
            },

            // optional method
            'response': function response(_response) {
                // do something on success
                return _response;
            },

            // optional method
            'responseError': function responseError(rejection) {
                // do something on error
                if (canRecover(rejection)) {
                    return responseOrNewPromise;
                }
                return $q.reject(rejection);
            }
        };
    };

    angular.module('app').factory('myHttpInterceptor', httpInterceptorFunc);
})();