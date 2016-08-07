// View Profile Controller
// =====================================================================================================================
(function () {

    var profileViewCtrlFunc = function ($http, $httpParamSerializerJQLike, $scope, $state, $mdToast,localStorageService) {

        var currentUser = angular.fromJson(localStorageService.get('user'));

        $http({
            method: 'GET',
            url: '/api/users/' + currentUser.email
        })
            .success(function (data) {
                $scope.user = data.user;
            })
            .error(function(err) {
                // do something if data not loaded
                $mdToast.show($mdToast.simple().position('top right').textContent(err.toString()));

            });
    };

    angular.module('app').controller('profileViewCtrl', [ '$http', '$httpParamSerializerJQLike', '$scope', '$state', '$mdToast', 'localStorageService', profileViewCtrlFunc]);

})();