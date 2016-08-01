app.controller('loginCtrl', ['CONST_VALIDATORS', '$http', function(CONST_VALIDATORS, $http) {
    this.user = {};

    this.submitLoginForm = function () {
        $http({
            method: 'POST',
            url: '/api/login',
            data: this.user,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    }

}]);