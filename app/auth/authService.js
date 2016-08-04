angular.module('app').service('$authService', [
    '$http',
    '$httpParamSerializerJQLike',
    function ($http, $httpParamSerializerJQLike) {

        this.authentificate = function (data) {

            return new Promise(function(resolve, reject) {
                $http({
                    method: 'POST',
                    url: '/api/login',
                    data: $httpParamSerializerJQLike(data),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function successCallback(response) {
                    console.log('[SUCCESS] ', response);
                    resolve();

                }, function errorCallback(err) {

                    $mdToast.show($mdToast.simple().position('top right').textContent('Invalid email or password!'));

                    console.log('[ERROR] ', err);

                });
            });

        };
}]);