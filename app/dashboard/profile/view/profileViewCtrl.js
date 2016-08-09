// View Profile Controller
// =====================================================================================================================
(function () {

    var profileViewCtrlFunc = function ($http, $scope, $state, localStorageService, profileService, toastService) {
        var vm = this;
        var currentUser = angular.fromJson(localStorageService.get('user'));

        profileService.getUserProfile(currentUser.email)
            .then(function(res) {
                vm.user = res.data.user;
            });

    };
    angular.module('app.profile').controller('profileViewCtrl', ['$http', '$scope', '$state', 'localStorageService', 'profileService', 'toastService', profileViewCtrlFunc]);

})();