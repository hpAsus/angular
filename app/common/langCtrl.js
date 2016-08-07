// Language controller
// =====================================================================================================================
//(function () {

    var langCtrlFunc = function ($scope, $rootScope, $translate) {

        var active = $translate.preferredLanguage();

        $rootScope.switchLang = function (key) {
            console.log($translate.proposedLanguage());
            $translate.use(key);
            $rootScope.activeLanguage = key;
        };

        $rootScope.activeLanguage = active;
        console.log(active);
    };

    angular.module('app').controller('langCtrl', ['$scope', '$rootScope', '$translate', langCtrlFunc]);

//})();