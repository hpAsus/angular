// Main Dashboard Controller
// =====================================================================================================================
(function () {

    var dashboardCtrlFunc = function (userDataService) {
        var vm = this;

	    if (userDataService.getUserData()) {

            // set locals
            vm.loggedIn = userDataService.isAuthorized();
            vm.user = userDataService.getUserData();

        }

    };

    angular.module('app').controller('dashboardCtrl', ['userDataService', dashboardCtrlFunc]);

})();