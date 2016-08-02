app.controller('loginCtrl', ['CONST_VALIDATORS', '$http', '$httpParamSerializerJQLike', '$state', '$mdToast', function(CONST_VALIDATORS, $http, $httpParamSerializerJQLike, $state, $mdToast) {
    this.user = {};

    this.submitLoginForm = function () {
        //console.log('userObject: ',  this.user);

        $http({
            method: 'POST',
            url: '/api/login',
            data: $httpParamSerializerJQLike(this.user),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {

            console.log('[SUCCESS] ',response);

            $state.go('profile');

        }, function errorCallback(err) {

            $mdToast.show($mdToast.simple().position('top right').textContent('Invalid email or password!'));

            console.log('[ERROR] ', err);

        });
    }

}]);