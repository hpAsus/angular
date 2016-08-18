'use strict';

// Action Test Controller
// =====================================================================================================================
(function () {

    var actionTestCtrlFunc = function actionTestCtrlFunc($http) {
        var vm = this;

        // Test 1 Function that returns promise (fast no delay)
        vm.testAction1 = $http({
            method: 'GET',
            url: '/action_req_1'
        });

        // Test 2 Slow
        vm.testAction2 = $http({
            method: 'GET',
            url: '/action_req_2'
        });
    };

    angular.module('app').controller('actionTestCtrl', ['$http', actionTestCtrlFunc]);
})();