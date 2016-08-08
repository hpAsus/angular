// View Profile Controller
// =====================================================================================================================
(function () {

    var profileCtrlFunc = function ($scope, $state) {

        // setting current tab
        this.currentNavItem = $state.current.name;
    };


    angular.module('app.profile').controller('profileCtrl', ['$scope', '$state', profileCtrlFunc]);

})();