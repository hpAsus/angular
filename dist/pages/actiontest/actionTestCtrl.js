'use strict';

// Action Test Controller
// =====================================================================================================================
(function () {

    var actionTestCtrlFunc = function actionTestCtrlFunc($scope) {
        var vm = this;

        console.log('actionTestCtrl');
    };

    angular.module('app').controller('actionTestCtrl', ['$scope', actionTestCtrlFunc]);
})();