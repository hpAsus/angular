'use strict';

// Action Item controller
// =====================================================================================================================
(function () {

    var atActionItemCtrlFunc = function atActionItemCtrlFunc(scope, element, attrs, $timeout) {
        var vm = this;
        var firstRun = true;
        var firstDelay = 3 * 1000;
        var promiseCompleted = false;

        //Statuses
        //0 - Play (Default)
        //1 - In progress (loading)
        //2 - Success
        //3 - Error
        vm.statuses = ['play', 'progress', 'success', 'error'];
        vm.currentStatus = vm.statuses[0];

        var promise = scope.ngModel;

        // Get Status
        function getStatus() {
            return vm.currentStatus;
        }
        // Set status

        function setStatus(status) {
            vm.currentStatus = vm.statuses[status];
        }

        // Start Action
        vm.actionStart = function () {

            if (firstRun) {
                console.log('>>>>>>>>>>>>> First Run');
                promise.then(function (res) {
                    promiseCompleted = true;
                    console.log('Promise arrived!');
                    // setStatus(2);
                });

                setStatus(1);

                $timeout(function () {
                    console.log('firscheck after first delay');
                    setStatus(2);
                }, firstDelay);

                firstRun = false;
            } else {
                console.log('action in progress or finished');
            }
        };
    };

    angular.module('atActionButton').controller('atActionItemCtrl', ['$scope', '$element', '$attrs', '$timeout', atActionItemCtrlFunc]);
})();