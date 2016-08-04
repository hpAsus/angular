// Language controller
// =====================================================================================================================
angular.module('app').controller('langCtrl', ["$scope", "$translate", function($scope, $translate){
    var active = $translate.preferredLanguage();

    $scope.switchLang = function(key) {
        $translate.use(key);
        $scope.activeLanguage = key;
    };

    $scope.activeLanguage = active;
}]);