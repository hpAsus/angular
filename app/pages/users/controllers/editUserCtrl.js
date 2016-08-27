// Edit User Controller
// =====================================================================================================================
(function () {

    var editUserCtrlFunc = function (CONST_VALIDATORS, CONST_USER_ROLES, usersService, $mdDialog, loaderService, toastService, login, userDataService) {
        var vm = this;

        //Sending some constants to view
        vm.nameMaxWords = CONST_VALIDATORS.MAX_WORDS_IN_NAME;
        vm.minAge = CONST_VALIDATORS.AGE_MINIMUM;
        vm.maxAge = CONST_VALIDATORS.AGE_MAXIMUM;
        vm.bioMaxLength = CONST_VALIDATORS.MAX_BIO_LENGTH;

        loaderService.addLoader();
        loaderService.showLoader();

        //check if is admin
        vm.isAdmin = userDataService.isAdmin(userDataService.getUserRole());
        vm.adminRole = CONST_USER_ROLES.ROLE_ADMIN;

        //Get user model from server
        usersService.getUser(login).then(function (res) {
            vm.user = res.data.user;
            loaderService.hideLoader();
        });

        // Cancel Dialog
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        // Submit Edit Form
        vm.submitForm = function () {
            loaderService.showLoader();
            usersService.updateUser(vm.user)
                .then(function (res) {
                    if (res.data.success) {
                        toastService.show('User info successfully edited!');
                        loaderService.hideLoader();
                        $mdDialog.hide('ok');
                    } else {
                        toastService.show(res.data.error.message);
                        loaderService.hideLoader();
                        $mdDialog.hide('error');
                    }
                })
                .catch(function (err) {
                    toastService.show(err);
                    loaderService.hideLoader();
                    $mdDialog.hide('error');
                });

        };


    };

    angular.module('app.users').controller('editUserCtrl', ['CONST_VALIDATORS', 'CONST_USER_ROLES', 'usersService', '$mdDialog', 'loaderService', 'toastService', 'login', 'userDataService', editUserCtrlFunc]);

})();