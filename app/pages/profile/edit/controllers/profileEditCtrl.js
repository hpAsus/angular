// Edit Profile Controller
// =====================================================================================================================

(function () {

    var profileEditCtrlFunc = function (CONST_VALIDATORS, loaderService, $state, $rootScope, toastService, userDataService, profileService) {

        var vm = this;

        loaderService.addLoader();
        
        vm.user = userDataService.getUserData();
        
        //Sending some constants to view
        vm.nameMaxWords = CONST_VALIDATORS.MAX_WORDS_IN_NAME;
        vm.minAge = CONST_VALIDATORS.AGE_MINIMUM;
        vm.maxAge = CONST_VALIDATORS.AGE_MAXIMUM;
        vm.bioMaxLength = CONST_VALIDATORS.MAX_BIO_LENGTH;

        //setting current tab
        $rootScope.currentNavItem = $state.current.name;

        //Profile Update form
        vm.submitProfileUpdateForm = function () {

            loaderService.showLoader();

            profileService.updateUserProfile(this.user)
                .then(function (data) {

                    userDataService.setUserData(data.data.user);

                    $state.go('viewProfile');
                    loaderService.hideLoader();
                }).catch(function (err) {
                toastService.show(err.toString());
                loaderService.hideLoader();
            });
        };
    };

    angular.module('app.profile').controller('profileEditCtrl', ['CONST_VALIDATORS', 'loaderService', '$state', '$rootScope', 'toastService', 'userDataService', 'profileService', profileEditCtrlFunc]);

})();

