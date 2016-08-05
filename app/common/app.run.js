var appRunFunc = function($rootScope, $state, $http) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        var stateIsProtected = toState.data && toState.data.secure;

        if (stateIsProtected) {

            // check user credentials
            $http({
                method: 'POST',
                url: '/api/checkuser',
                data: $httpParamSerializerJQLike(this.user),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (res) {

                //if (res.success) {
                //    $state.go('viewProfile');
                //} else {
                //
                //    // Show toast with error message
                //    $mdToast.show($mdToast.simple().position('top right').textContent(res.error.message));
                //}
            }).error(function (err) {

                // Something wrong with serverside, show error toast
                //$mdToast.show($mdToast.simple().position('top right').textContent('Server is taking a coffee. Try again later'));

            });

            if (true) {
                event.preventDefault();
                $state.go('login');
            }

        }
    });
};

angular.module('app').run(['$rootScope', '$state', '$http', appRunFunc]);