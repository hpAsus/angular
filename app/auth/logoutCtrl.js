// Logout controller
// =====================================================================================================================
angular.module('app.auth').controller('logoutCtrl', ["$scope", function($scope){
    var active = $translate.preferredLanguage();

    $scope.switchLang = function(key) {
        $translate.use(key);
        $scope.activeLanguage = key;
    };

    $scope.activeLanguage = active;
}]);