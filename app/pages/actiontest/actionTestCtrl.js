// Action Test Controller
// =====================================================================================================================
(function () {

    var actionTestCtrlFunc = function ($scope) {
        var vm = this;

        console.log('actionTestCtrl');

    };

    angular.module('app').controller('actionTestCtrl', ['$scope', actionTestCtrlFunc]);

})();