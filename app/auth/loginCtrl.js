angular.module('app').controller('loginCtrl', [
    '$http',
    '$httpParamSerializerJQLike',
    '$state',
    '$mdToast',
    '$authService',
    function ($http, $httpParamSerializerJQLike, $state, $mdToast, $authService) {
        this.user = {};

        this.submitLoginForm = function () {
            //console.log('userObject: ',  this.user);


            $state.go('viewProfile');

            $authService.authenticate(this.user, this.password);
            $http({
                method: 'POST',
                url: '/api/login',
                data: $httpParamSerializerJQLike(this.user),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {

                console.log('[SUCCESS] ', response);

                $state.go('viewProfile');

            }, function errorCallback(err) {

                $mdToast.show($mdToast.simple().position('top right').textContent('Invalid email or password!'));

                console.log('[ERROR] ', err);

            });
        }

    }]);