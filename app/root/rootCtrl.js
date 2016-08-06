(function () {

    var rootCtrl = function ($scope, $rootScope) {
        this.isLoggedIn = $rootScope.loggedIn;
        this.user = $rootScope.user;
    };

    angular.module('app').controller('rootCtrl', ['$scope', '$rootScope', rootCtrl]);

})();