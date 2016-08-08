// View Profile Controller
// =====================================================================================================================
(function () {

    var profileViewCtrlFunc = function ($http, $scope, $state, localStorageService, profileService, toastService) {
        var vm = this;
        var currentUser = angular.fromJson(localStorageService.get('user'));

        vm.test = 'text';

        profileService.getUserProfile(currentUser.email)
            .then(function(res) {
                vm.user = res.data.user;
            }).catch(function(err) {
                toastService.message(err.toString());
            });

    };
    angular.module('app.profile').controller('profileViewCtrl', ['$http', '$scope', '$state', 'localStorageService', 'profileService', 'toastService', profileViewCtrlFunc]);

})();