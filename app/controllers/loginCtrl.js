app.controller('loginCtrl', ['CONST_VALIDATORS', '$http', '$httpParamSerializerJQLike', function(CONST_VALIDATORS, $http, $httpParamSerializerJQLike) {
    this.user = {};

    this.submitLoginForm = function () {
        console.log('userObject: ',  this.user);

        $http({
            method: 'POST',
            url: '/api/login',
            data: $httpParamSerializerJQLike(this.user),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {

            console.log(response);

        }, function errorCallback(response) {

            console.log(response);

        });
    }

}]);