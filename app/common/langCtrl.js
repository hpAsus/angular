// Language controller
// =====================================================================================================================
(function () {

    var langCtrlFunc = function ($scope, $rootScope, $translate) {
        var vm = this;
        vm.activeLanguage = $translate.preferredLanguage();
        vm.switchLang = function (key) {
            $translate.use(key);
            vm.activeLanguage = key;
        };
    };

    angular.module('app').controller('languageCtrl', ['$scope', '$rootScope', '$translate', langCtrlFunc]);

})();