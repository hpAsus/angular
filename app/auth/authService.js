var authService = function ($http, $httpParamSerializerJQLike) {
    this.user = {};
    this.submitLoginForm = function (data) {
        $http({
            method: 'POST',
            url: '/api/login',
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            console.log('[SUCCESS] ', response);
            //$state.go('viewProfile');
        }, function errorCallback(err) {
            $mdToast.show($mdToast.simple().position('top right').textContent('Invalid email or password!'));
            console.log('[ERROR] ', err);
        });
    }
};

angular.module('app').service('authService', ['$http', '$httpParamSerializerJQLike', authServiceFunc]);