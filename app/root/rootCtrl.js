(function () {

    var rootCtrl = function ($scope, $rootScope, userData) {

        console.log(userData);
        if (userData) {

            $rootScope.loggedIn = true;
            $rootScope.user = userData;

            this.loggedIn = true;
            this.user = userData;
        }

    };

    angular.module('app').controller('rootCtrl', ['$scope', '$rootScope', 'userData', rootCtrl]);

})();