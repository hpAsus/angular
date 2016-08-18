// Action Item controller
// =====================================================================================================================
(function () {

    var atActionItemCtrlFunc = function (scope, element, attrs, $timeout, $interval) {
        var vm = this;
        var firstRun = true;
        var firstDelay = 3 * 1000;
        var checkInterval = 5 * 1000;
        var finalCheckDelay = 60 * 1000;
        var promiseCompleted = false;
        var promiseError = false;
        var checkIntervalID;

        //Statuses
        //0 - Play (Default)
        //1 - In progress (loading)
        //2 - Success
        //3 - Error
        vm.statuses = ['play', 'progress', 'success', 'error'];
        vm.currentStatus = vm.statuses[0];


        // Get Status
        function getStatus() {
            return vm.currentStatus;
        }

        // Set status
        function setStatus(status) {
            vm.currentStatus = vm.statuses[status];
        }

        function isPromiseCompleted() {
            if (promiseCompleted) {
                promiseError ? setStatus(3) : setStatus(2);

                //clear step
                firstRun = false;
                // if (checkIntervalID) {
                //     console.log('interval cleared');
                //     $interval.cancel(checkIntervalID);
                // }
                return true;
            } else {
                return false;
            }
        }


        // Start Action
        vm.actionStart = function () {
            var promise = scope.ngModel();


            if (firstRun) {
                promise.then(function (res) {
                    promiseCompleted = true;
                    console.log('Promise arrived!');
                }).catch(function (err) {
                    promiseCompleted = true;
                    promiseError = true;
                });

                setStatus(1);

                //start delay
                $timeout(function () {
                    console.log('[Action started]');

                    if (!isPromiseCompleted()) {

                        console.log('[Delay passed] Action not completed yet');

                        checkIntervalID = $interval(function () {
                            if (isPromiseCompleted()) {
                                console.log('[Interval cancelled]');
                                $interval.cancel(checkIntervalID);
                            } else {
                                console.log('[Checking...] ', checkInterval);
                            }
                        }, checkInterval);

                        // Final check
                        $timeout(function () {
                            console.log('[Final check]');
                            if (checkIntervalID) {
                                console.log('[Interval cancelled]');
                                $interval.cancel(checkIntervalID);
                            }
                            if(!isPromiseCompleted()) {
                                setStatus(3);
                            };
                        }, finalCheckDelay);

                    } else {
                        console.log('[Action completed]');
                    }

                }, firstDelay);

                firstRun = false;
            } else {
                console.log('action in progress or finished');
            }

        }


    };

    angular.module('atActionButton').controller('atActionItemCtrl', ['$scope', '$element', '$attrs', '$timeout', '$interval', atActionItemCtrlFunc]);

})();